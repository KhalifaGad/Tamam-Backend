import boom from "@hapi/boom";
import { checkAuth } from "../utils/authHelper";
import { addressesModule } from "../db/modules/addresses";
import { getCountry } from "../utils/countryHelper";
import { getProductsGroup } from "../utils/productsHelper";
import { prepareOrder } from "../utils/orderHelper";
import { ordersModule } from "../db/modules/orders";

async function makeOrder(req, res, next) {
  let { productsArr, userId, addressId } = req.body,
    productsIds = productsArr.map(product => product.productId);
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
  //console.log(products);
  /* let {
    preparedOrderArr,
    orderTotal,
    grandTotal,
    tax,
    estimatedTime
  } = await prepareOrder(products, productsArr); */
  let orders = await prepareOrder(products, productsArr);
  console.log(orders);

  let savedOrders = [];

  for (let i = 0; i < orders.length; i++) {
    orders[i].userId = userId;
    orders[i].deliveryAddress = addressId;
    orders[i].productsIds = orders[i].preparedOrderArr;
    delete orders[i].preparedOrderArr;
    savedOrders.push(await ordersModule.saveOrder(order));
  }
  console.log(savedOrders);
  return res.status(201).send({
    isSuccessed: true,
    data: savedOrders,
    error: null
  });

  /* let savedOrder = await ordersModule.saveOrder(order);
  console.log(savedOrder);

  if (!savedOrder) return next(boom.notAcceptable("Error issuing order"));

  return res.status(201).send({
    isSuccessed: true,
    data: savedOrder,
    error: null
  }); */
  // fetch the product
  // check for offer and fetch it if exist
}

function getUserOrders(req, res, next) {}

export { makeOrder, getUserOrders };
