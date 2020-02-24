import Joi from "@hapi/joi";

const updateOrderVS = Joi.object({
  state: Joi.string().valid(
    "PAYMENT PENDING",
    "CANCELED",
    "SELLER PENDING",
    "ACCEPTED",
    "MANUFACTORY",
    "STORED",
    "SHIPPED FROM ORIGIN COUNTRY",
    "DELIVERED DESTINATION COUNTRY",
    "SHIPPED TO USER ADDRESS",
    "TAMAM",
    "REFUSED"
  ),
  refusingNote: Joi.string(),
  estimatedTime: Joi.date()
}).xor('state', 'estimatedTime');

export { updateOrderVS }
