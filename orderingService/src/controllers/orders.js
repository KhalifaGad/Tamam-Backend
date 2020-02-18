import OrderModel from "../db/models/order";
import boom from "@hapi/boom";
import axios from "axios";
import { checkAuth } from "../utils/authHelper";
import { addressesModule } from "../db/modules/addresses";

async function makeOrder(req, res, next) {
  let {
    productId,
    userId,
    addressId
  } = req.body
  
  // check for the address
  let address = await addressesModule.getAddress(userId, addressId)

  console.log(address)


  // check the user authentication,
  let auth = req.headers.authentication;
  if (!auth) {
    return next(boom.forbidden("Authentication required!"));
  }

  // sending auth var to user authentication api
  let authResponse = await checkAuth(auth);

  if (!authResponse) return next(boom.badRequest("Failed in authenticating"));

  //authResponse.status, authResponse.data
  console.log(authResponse.data);
  if (authResponse.status > 299)
    return next(boom.forbidden("Authentication required!"));

  let productRes;
  try {
    productRes = await axios
      .create({
        baseURL: "http://products-service:3001/api/v1",
        headers: {
          authentication: auth
        }
      })
      .get("/products/" + productId);
  } catch (err) {
    return res.status(err.response.status).send(err.response.data);
  }
  console.log(productRes.data);
  let product = productRes.data.data;

  return res.send("ok");
  // fetch the product
  // check for offer and fetch it if exist
}

function getUserOrders(req, res, next) {}

export { makeOrder, getUserOrders };
