import Joi from "@hapi/joi";
import { isMongooseId } from "../validationSchemasHelper";

/* 
    --------------typography-------------
            VS => ValidationSchema
*/

const makeOrderVS = Joi.object({
  productsIds: Joi.array()
    .items(Joi.object({
      productId: Joi.custom(isMongooseId, "custom validation").required(),
      quantity: Joi.number().required()
    }))
    .required(),
  userId: Joi.custom(isMongooseId, "custom validation").required(),
  addressId: Joi.custom(isMongooseId, "custom validation").required()
});

export { makeOrderVS };
