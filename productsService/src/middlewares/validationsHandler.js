import {
  addProductVS,
  idVS,
  getProductsVS,
  addHomeSectionVS,
  addOfferVS,
  getOffersVS,
  addCategoryVS,
  addSubcategoriesVS,
  editFavsVS,
  editCartVS
} from "../utils/validationSchemas";
import boom from "@hapi/boom";
import { requestAuth } from "../utils/authRequest";

/* 
    -------------typos-------------
    VM => Validation middleware
*/

function addProdcutVM(req, res, next) {
  const { error } = addProductVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function queryIdVM(req, res, next) {
  let isValid = idVS(req.params.id);

  if (!isValid) {
    next(boom.badData("Invalid Id"));
  }

  next();
}

function getProductsVM(req, res, next) {
  const { error } = getProductsVS.validate(req.query);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addNewHomeSectionVM(req, res, next) {
  const { error } = addHomeSectionVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addOfferVM(req, res, next) {
  const { error } = addOfferVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  let isValid = idVS(req.params.id);

  if (!isValid) {
    next(boom.badData("Invalid Id"));
  }

  next();
}

function getOffersVM(req, res, next) {
  let { error } = getOffersVS.validate(req.query);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addCategoryVM(req, res, next) {
  let { error } = addCategoryVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addSubcategoryVM(req, res, next) {
  let { error } = addSubcategoriesVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}
//editFavsVS
function editFavsVM(req, res, next) {
  let { error } = editFavsVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function editCartVM(req, res, next) {
  let { error } = editCartVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

async function aboveCustomerAuthorization(req, res, next) {
  let auth = req.headers.authentication;
  if (!auth) return next(boom.unauthorized("Do not play with us, okay!!"));

  let user = await requestAuth(auth);
  if (!user) return next(boom.unauthorized("Error authenticating request"));

  if(user.role == 'CUSTOMER') return next(boom.unauthorized('Not Allowed for this action'))

  req.body.seller = user._id

  next()
}

export {
  addProdcutVM,
  queryIdVM,
  getProductsVM,
  addNewHomeSectionVM,
  addOfferVM,
  getOffersVM,
  addCategoryVM,
  addSubcategoryVM,
  editFavsVM,
  editCartVM,
  aboveCustomerAuthorization
};
