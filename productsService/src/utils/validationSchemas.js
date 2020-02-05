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
        .min(3)
        .max(150)
        .required(),
    nameEn: Joi.string()
        .regex(/^[\w\-\s]+$/)
        .min(3)
        .max(150)
        .required(),
    descriptionAr: Joi.string()
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
    isTurkish: Joi.boolean(),
    availableCountries: Joi.array()
        .items(Joi.custom(
            mongooseIdJoiHelper,
            'custom validation').required()
        ).required()
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
    d: Joi.string().valid('A', 'D'),
    CoI: Joi.custom(mongooseIdJoiHelper, 'custom validation')
})

const addHomeSectionVS = Joi.object({
    active: Joi.boolean(),
    sectionNameAr: Joi.string().required(),
    sectionNameEn: Joi.string().required(),
    clientEndPointURL: Joi.string().required(),
    serverEndPointURL: Joi.string().required(),
    skip: Joi.number(),
    limit: Joi.number()
})

const addOfferVS = Joi.object({
    discountRatio: Joi.number().required(),
    startingDate: Joi.date(),
    expirationDate: Joi.date().required(),
    availableCountries: Joi.array()
        .items(Joi.custom(
            mongooseIdJoiHelper,
            'custom validation').required()
        ).required()
})

const getOffersVS = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
    CoI: Joi.custom(mongooseIdJoiHelper, 'custom validation')
})

const addCategoryVS = Joi.object({
    nameAr: Joi.string().min(3).required(),
    nameEn: Joi.string().min(3).required(),
    subcategories: Joi.array().items(Joi.object({
        nameAr: Joi.string().required(),
        nameEn: Joi.string().required()
    }))
})

const addSubcategoriesVS = Joi.object({
    subcategories: Joi.array().items(Joi.object({
        nameAr: Joi.string().required(),
        nameEn: Joi.string().required()
    })).required()
})

export {
    addProductVS,
    getProductsVS,
    idVS,
    addHomeSectionVS,
    addOfferVS,
    getOffersVS,
    addCategoryVS,
    addSubcategoriesVS
}
