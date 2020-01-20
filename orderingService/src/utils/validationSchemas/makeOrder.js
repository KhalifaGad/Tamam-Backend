import Joi from '@hapi/joi'
import { isMongooseId } from '../validationSchemasHelper'

/* 
    --------------typography-------------
            VS => ValidationSchema
*/

const makeOrderVS = Joi.object({
    productId: Joi.custom(isMongooseId,
            'custom validation').required(),
    offerId: Joi.custom(isMongooseId, 'custom validation'),
    userId: Joi.custom(isMongooseId,
        'custom validation').required(),
    addressId: Joi.custom(isMongooseId,
        'custom validation').required()
})

export { makeOrderVS }
