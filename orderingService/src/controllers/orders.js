import OrderModel from "../db/models/order";
import boom from "@hapi/boom";
import axios from "axios";

async function makeOrder(req, res, next) {
    // check the user authentication,
    let auth = req.headers.authentication;
    if (!auth) {
      return next(boom.forbidden("Authentication required!"));
    }
  
    // sending auth var to user authentication api
    let authResponse;
  
    try {
      authResponse = await axios
        .create({
          baseURL: "http://users-service:3002/api/v1",
          headers: {
            authentication: auth
          }
        })
        .get("/auth/user/cardinalities");
    } catch (err) {
      return res.status(err.response.status).send(err.response.data);
    }
  
    //authResponse.status, authResponse.data
    if (authResponse.status > 299) {
      return next(boom.forbidden("Authentication required!"));
    }
  
    // return res.send("ok");
    let productId = req.body.productId,
    productRes
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
    console.log(productRes.data)
    return res.send('ok')
    // fetch the product
    // check for offer and fetch it if exist
  }

function getUserOrders(req, res, next) {}

export { makeOrder, getUserOrders };

