import Joi from '@hapi/joi'
import { isMongooseId } from '../validationSchemasHelper'

let CODPaymentVS = Joi.object({
    orderId: Joi.custom(isMongooseId, "custom validation").required()
})

export { CODPaymentVS }
