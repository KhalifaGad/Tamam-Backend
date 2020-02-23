import boom from "@hapi/boom";
import { checkAuth } from "../utils/authHelper";

async function getUser(req, res, next) {
  let auth = req.headers.authentication;

  if (!auth) return next(boom.unauthorized("Not authenticated!"));

  let authRes = await checkAuth(auth);

  if (!authRes)
    return next(boom.badRequest("Failed in authentication, old or malformed"));

  let authResData = authRes.data.data;

  if (authResData.role == "CUSTOMER")
    return next(boom.unauthorized("This endpoint is not for you!"));

  if (!req.body) {
    req.body = {};
  }

  req.body.sellerId = authResData.userId;
  next();
}

export { getUser };
