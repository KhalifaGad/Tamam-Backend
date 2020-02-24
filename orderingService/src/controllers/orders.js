import boom from "@hapi/boom";
import { checkAuth } from "../utils/authHelper";
import { addressesModule } from "../db/modules/addresses";
import { getCountry } from "../utils/countryHelper";
import { getProductsGroup } from "../utils/productsHelper";
import { prepareOrder } from "../utils/orderHelper";
import { ordersModule } from "../db/modules/orders";
import { paymentTypesModule } from "../db/modules/paymentType";

async function makeOrder(req, res, next) {
  let { productsArr, userId, addressId } = req.body,
    productsIds = productsArr.map(product => product.productId),
    excludedName = "nameEn",
    selectedName = "nameAr";
  if (req.query.lang == "en") {
    excludedName = "nameAr";
    selectedName = "nameEn";
  }
  // check for the address
  let address = await addressesModule.getAddress(userId, addressId);

  if (!address) return next(boom.badData("No address for this address id"));

  let country = await getCountry(address.countryCode);

  if (country.isBlocked)
    return next(
      boom.badData(
        `Country: ${address.countryName} has been blocked by tamam, for a while.`
      )
    );

  // check the user authentication,
  let auth = req.headers.authentication;
  if (!auth) {
    return next(boom.forbidden("Authentication required!"));
  }

  // sending auth var to user authentication api
  let authResponse = await checkAuth(auth);

  if (!authResponse) return next(boom.badRequest("Failed in authenticating"));

  //authResponse.status, authResponse.data
  if (authResponse.status > 299)
    return next(boom.forbidden("Authentication required!"));

  /* console.log(productRes.data); */
  let products = await getProductsGroup(productsIds);

  if (products == null || products == [])
    return next(boom.badRequest("Can not find products for those ids"));

  if (products.indexOf(undefined) > -1 || products.indexOf(null) > -1)
    return next(boom.badRequest("Some of your Ids is invalide"));

  let orders = await prepareOrder(products, productsArr, userId, addressId);

  let savedOrders = await ordersModule.saveMultipleOrders(orders);

  if (!savedOrders) return next(boom.internal("Failed inserting orders"));
  let paymentTypes = await paymentTypesModule.getTypes(excludedName);
  return res.status(201).send({
    isSuccessed: true,
    data: {
      orders: savedOrders,
      paymentTypes: paymentTypes
        .filter(type => type.isActive)
        .map(type => {
          type.name = type[selectedName];
          delete type[selectedName];
          return type;
        })
    },
    error: null
  });
}

function getUserOrders(req, res, next) {}

async function editOrder(req, res, next) {
  let orderId = req.params.id,
  { state, refusingNote, estimatedTime } = req.body,
  order = null
  if(state != undefined){
    if (state == "ACCEPTED") {
      order = await ordersModule.acceptOrder(orderId)
    } else if (state == "REFUSED") {
      order = await ordersModule.refuseOrder(orderId, refusingNote)
    } else {
      order = await ordersModule.changeOrderState(orderId, state)
    }
  } else {
    order = await ordersModule.changeEstimatedTime(orderId, estimatedTime)
  }

  if(!order) return next(boom.badRequest('Process failed'))

  res.status(201).send({
    isSuccessed: true,
    data: order,
    error: null
  })

}

export { makeOrder, getUserOrders, editOrder };
