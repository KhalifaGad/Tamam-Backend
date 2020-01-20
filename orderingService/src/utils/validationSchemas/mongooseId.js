import Joi from '@hapi/joi'
import { isMongooseId } from '../validationSchemasHelper'

/* 
    --------------typography-------------
            VS => ValidationSchema
*/

const mongooseIdVS = Joi.object({
    id: Joi.custom(isMongooseId,
        'custom validation').required()
})

export { mongooseIdVS }
