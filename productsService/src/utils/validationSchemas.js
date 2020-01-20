import Joi from '@hapi/joi'
import mongoose from 'mongoose'
import { mongooseIdJoiHelper } from './idValidation'

/* 
    -------------typos-------------
    VS => Validation Schema
*/


// min and max will be edited after testing the api

//.regex(/^[\w\-\s]+$/) matches alphanumric and '-' and space
const addProductVS = Joi.object({
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
function idVS(id) {
    try {
        return id == new mongoose.Types.ObjectId(id) ? true : false
    } catch (err) {
        return false
    }
}

const getProductsVS = Joi.object({
    lang: Joi.string().valid('en', 'ar'),
    limit: Joi.number(),
    skip: Joi.number(),
    c: Joi.custom(mongooseIdJoiHelper, 'custom validation'),
    s: Joi.custom(mongooseIdJoiHelper, 'custom validation'),
    d: Joi.string().valid('A', 'D')
})

const addHomeSectionVS = Joi.object({
    isSelected: Joi.boolean(),
    sectionNameAr: Joi.string().required(),
    sectionNameEn: Joi.string().required(),
    endPointURL: Joi.string().required()
})

export { 
    addProductVS,
    getProductsVS,
    idVS,
    addHomeSectionVS 
}
