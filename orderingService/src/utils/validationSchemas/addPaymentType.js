import Joi from '@hapi/joi'

let addPaymentTypeVS = Joi.object({
    nameAr: Joi.string().min(3).required(),
    nameEn: Joi.string().min(3).required(),
    isActive: Joi.boolean()
})

export { addPaymentTypeVS }
