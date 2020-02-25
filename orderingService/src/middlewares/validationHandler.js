import boom from "@hapi/boom";
import {
  mongooseIdVS,
  getAddressVS
} from "../utils/validationSchemas/mongooseId";
import {
  addAddressVS,
  toggleMainAddressVS
} from "../utils/validationSchemas/addresses";
import { addPaymentTypeVS } from "../utils/validationSchemas/addPaymentType";
import { CODPaymentVS } from "../utils/validationSchemas/CODPayment";
import { updateOrderVS } from "../utils/validationSchemas/updateOrder";
import { makeOrderVS } from "../utils/validationSchemas/makeOrder";
import { getSellerOrderVS } from "../utils/validationSchemas/sellerOrders";

/* 
    --------------typography-------------
            VM => ValidationMiddleware
*/

function makeOrderVM(req, res, next) {
  const { error } = makeOrderVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function mongooseIdReqParamVM(req, res, next) {
  const { error } = mongooseIdVS.validate(req.params);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function idAndAuthCheck(req, res, next) {
  let id = req.params.id;
  const { error } = mongooseIdVS.validate({id});

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  if (req.body.sellerId + "" != id + "")
    next(boom.unauthorized("Token and Id not match"));

  next()
}

function getAddressVM(req, res, next) {
  const { error } = getAddressVS.validate(req.params);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addAddressVM(req, res, next) {
  const { error } = addAddressVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function toggleMainAddressVM(req, res, next) {
  const { error } = toggleMainAddressVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function addPaymentTypeVM(req, res, next) {
  const { error } = addPaymentTypeVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function CODPaymentVM(req, res, next) {
  const { error } = CODPaymentVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function updateOrderVM(req, res, next) {
  const { error } = updateOrderVS.validate(req.body);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

function getSellerOrderVM(req, res, next) {
  const { error } = getSellerOrderVS.validate(req.query);

  if (error) {
    next(boom.badData(error.details[0].message));
  }

  next();
}

export {
  makeOrderVM,
  mongooseIdReqParamVM,
  getAddressVM,
  addAddressVM,
  toggleMainAddressVM,
  addPaymentTypeVM,
  CODPaymentVM,
  updateOrderVM,
  idAndAuthCheck,
  getSellerOrderVM
};
