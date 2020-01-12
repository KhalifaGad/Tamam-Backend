import Joi from '@hapi/joi'
import boom from '@hapi/boom'
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
    categoryAr: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(50)
        .required(),
    categoryEn: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(50)
        .required(),
    subcategoryAr: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(50),
    subcategoryEn: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(50),
    price: Joi.number()
        .min(1)
        .max(1000000)
        .required(),
    quantityVal: Joi.number()
        .min(1)
        .required(),
    quantityMeasurement: Joi.string().valid('kg', 'pack', 'unit'),
    isTurkish: Joi.boolean().required()
})
// validate is id string a valid mongodb id by creating a new ObjectId with
// id string as value.
function idValidation(id) {
    return id == new mongoose.Types.ObjectId(id) ? true : boom.badRequest("Invalid Id")
}

export { addProductSchema, idValidation }
