import boom from "@hapi/boom";
import { checkAuth } from "../utils/authHelper";

async function getUser(req, res, next) {
  let auth = req.headers.authentication;

  if (!auth) return next(boom.unauthorized("Not authenticated!"));

  let authRes = await checkAuth(auth);

  if (!authRes) return next(boom.internal("Failed in authencation"));

  if (authRes.status > 299)
    return next(boom.badRequest("Failed in authentication"));

  let user = authRes.data.data;

  if (user.role == "CUSTOMER")
    return next(boom.unauthorized("This endpoint is not for you!"));

  req.body = {};
  req.body.seller = user;
  next();
}

export { getUser };
