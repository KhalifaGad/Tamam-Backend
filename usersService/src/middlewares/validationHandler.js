import boom from "@hapi/boom";
import {
  addUserValidationSchema,
  addCountryValidationSchema,
  verifyUserSchema,
  resendVerificationSchema,
  authenticationSchema,
  idQueryParamVS,
  addMessageVS,
  editProductVS
} from "../utils/validationSchemas";

function addUserValidation(req, res, next) {
  const { error } = addUserValidationSchema.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addCountryValidation(req, res, next) {
  const { error } = addCountryValidationSchema.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function verifyUserMiddleware(req, res, next) {
  const { error } = verifyUserSchema.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function rsndVrfcMiddleware(req, res, next) {
  const { error } = resendVerificationSchema.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function loginValidation(req, res, next) {
  const { error } = authenticationSchema.validate(req.body);

  if (error) {
    next(next(boom.badData(error.details[0].message)));
  }

  next();
}

function addMessageVM(req, res, next) {
  const { error } = addMessageVS.validate(req.body);

  if (error) {
    next(next(boom.badData(error.details[0].message)));
  }

  next();
}

function editProductVM(req, res, next) {
  const { error } = editProductVS.validate(req.body);

  if (error) {
    next(next(boom.badData(error.details[0].message)));
  }

  next();
}

function idQueryParamVM(req, res, next) {
  const { error } = idQueryParamVS.validate(req.params);

  if (error) {
    next(next(boom.badData(error.details[0].message)));
  }

  next();
}

function roleValidation(req, res, next) {
  const { role } = req.body;

  if (role == "ADMIN" || role == "SELLER") {
    let auth = req.headers.authentication;
    if (auth != process.env.KHALIFAZ_SECRET)
      return next(boom.unauthorized("You are not allowed for this action!"));
  }

  next();
}

export {
  addUserValidation,
  addCountryValidation,
  verifyUserMiddleware,
  rsndVrfcMiddleware,
  loginValidation,
  idQueryParamVM,
  addMessageVM,
  editProductVM,
  roleValidation
};
