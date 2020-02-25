import Joi from "@hapi/joi";
import { isMongooseId } from "../validationSchemasHelper";

let paymentVS = Joi.object({
    ordersIds: Joi.array().items(
      Joi.custom(isMongooseId, "custom validation").required()
    ),
    paymentTypeId: Joi.custom(isMongooseId, "custom validation").required()
  });

export { paymentVS }
