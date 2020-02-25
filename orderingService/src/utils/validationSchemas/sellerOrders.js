import Joi from "@hapi/joi";

const getSellerOrderVS = Joi.object({
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
    lang: Joi.string().valid('en', 'ar'),
  })
  
  export { getSellerOrderVS }
  