import Joi from '@hapi/joi'
import mongoose from 'mongoose'

// min and max will be edited after testing the api

//.regex(/^[\w\-\s]+$/) matches alphanumric and '-' and space
const addProductSchema = Joi.object({
    nameAr: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(150)
        .required(),
    nameEn: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(150)
        .required(),
    descriptionAr: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(30),
    descriptionEn: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(30),
    categoryId: Joi.custom(
        mongooseIdJoiHelper,
        'custom validation').required(),
    subcategoryId: Joi.custom(
        mongooseIdJoiHelper,
        'custom validation'),
    price: Joi.number()
        .min(1)
        .max(1000000)
        .required(),
    quantityVal: Joi.number()
        .min(1)
        .required(),
    quantityMeasurement: Joi.string()
        .valid('kg', 'pack', 'unit').required(),
    isTurkish: Joi.boolean().required()
})
// validate is id string a valid mongodb id by creating a new ObjectId with
// id string as value.
function idValidation(id) {
    try {
        return id == new mongoose.Types.ObjectId(id) ? true : false
    } catch (err) {
        return false
    }
}

const getProductsValidSchema = Joi.object({
    lang: Joi.string().valid('en', 'ar'),
    limit: Joi.number(),
    skip: Joi.number(),
    c: Joi.custom(mongooseIdJoiHelper, 'custom validation'),
    s: Joi.custom(mongooseIdJoiHelper, 'custom validation')
})

function mongooseIdJoiHelper(value, helper) {
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
}

export { 
    addProductSchema,
    getProductsValidSchema,
    idValidation 
}
