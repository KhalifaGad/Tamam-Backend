import Joi from "@hapi/joi";
import { isMongooseId } from "../validationSchemasHelper";

let CODPaymentVS = Joi.object({
  ordersIds: Joi.array().items(
    Joi.custom(isMongooseId, "custom validation").required()
  )
});

export { CODPaymentVS };
