import Joi from '@hapi/joi'
import { checkMongooseId } from './mongooseIdHelper'

const addUserValidationSchema = Joi.object({
    userName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
    phone: Joi.number().min(5).required(),
    role: Joi.string()
        .valid("ADMIN", "SELLER", "CUSTOMER").required(),
    countryId: Joi.custom(checkMongooseId,
        'custom validation').required(),
    cityId: Joi.custom(checkMongooseId,
        'custom validation').required(),
    device: Joi.string().valid("ANDROID", "IOS", "WEB").required()

})

const addCountryValidationSchema = Joi.object({
    nameAr: Joi.string().required(),
    nameEn: Joi.string().required(),
    code: Joi.string().required(),
    keyNo: Joi.number().required(),
    cities: Joi.array().items(Joi.object({
        nameAr: Joi.string().required(),
        nameEn: Joi.string().required()
    }))
})

const verifyUserSchema = Joi.object({
    userId: Joi.custom(checkMongooseId,
        'custom validation').required(),
    code: Joi.number().min(6).required(),
    device: Joi.string().valid("ANDROID", "IOS", "WEB").required()
})

const resendVerificationSchema = Joi.object({
    userId: Joi.custom(checkMongooseId,
        'custom validation').required()
})

const authenticationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    device: Joi.string().valid("ANDROID", "IOS", "WEB").required()
})

const editFavsVS = Joi.object({
    isNew: Joi.boolean().required(),
    productId: Joi.custom(checkMongooseId,
        'custom validation').required()
})

const idQueryParamVS = Joi.object({
    id: Joi.custom(checkMongooseId,
        'custom validation').required()
})

const addMessageVS = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.number().min(5).required(),
    message: Joi.string().min(10).required(),
})

export {
    addUserValidationSchema,
    addCountryValidationSchema,
    verifyUserSchema,
    resendVerificationSchema,
    authenticationSchema,
    editFavsVS,
    idQueryParamVS,
    addMessageVS
}
