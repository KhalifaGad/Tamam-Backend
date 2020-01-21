import Joi from '@hapi/joi'
import mongoose from 'mongoose'

const addUserValidationSchema = Joi.object({
    fName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    lName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
    role: Joi.string()
        .valid("ADMIN", "SELLER", "CUSTOMER").required(),
    countryCityIds: Joi.custom((value, helpers) => {
        try {
            let check1 =
                value.countryId == new mongoose.Types.ObjectId(value.countryId)
                    ? true : false
            let check2 =
                value.cityId == new mongoose.Types.ObjectId(value.cityId)
                    ? true : false

            if (check1 && check2) {
                return value
            } else {
                return helpers.error('any.invalid')
            }

        } catch (err) {
            return helpers.error('any.invalid')
        }

    }, 'custom validation').required()
})

const addCountryValidationSchema = Joi.object({
    nameAr: Joi.string().required(),
    nameEn: Joi.string().required(),
    cities: Joi.array().items(Joi.object({
        nameAr: Joi.string().required(),
        nameEn: Joi.string().required()
    }))
})

const verifyUserSchema = Joi.object({
    userId: Joi.custom((value, helper) => {
        try {
            let check = value == new mongoose.Types.ObjectId(value)
                ? true : false

            if (!check) {
                return helpers.error('any.invalid')
            }
            return value
        } catch (err) {
            return helpers.error('any.invalid')
        }
    }, 'custom validation').required(),
    code: Joi.number().min(6).required()
})

const resendVerificationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    userId: Joi.custom((value, helper) => {
        try {
            let check = value == new mongoose.Types.ObjectId(value)
                ? true : false

            if (!check) {
                return helpers.error('any.invalid')
            }
            return value
        } catch (err) {
            return helpers.error('any.invalid')
        }
    }, 'custom validation').required()
})

const authenticationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export {
    addUserValidationSchema,
    addCountryValidationSchema,
    verifyUserSchema,
    resendVerificationSchema,
    authenticationSchema
}
