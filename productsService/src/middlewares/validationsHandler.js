import {
    addProductVS,
    idVS,
    getProductsVS,
    addHomeSectionVS,
    addOfferVS,
    getOffersVS,
    addCategoryVS,
    addSubcategoriesVS
} from '../utils/validationSchemas'
import boom from '@hapi/boom'

/* 
    -------------typos-------------
    VM => Validation middleware
*/

function addProdcutVM(req, res, next) {
    const {
        error
    } = addProductVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function queryIdVM(req, res, next) {
    let isValid = idVS(req.params.id)

    if (!isValid) {
        next(boom.badData("Invalid Id"))
    }

    next()
}

function getProductsVM(req, res, next) {
    const {
        error
    } = getProductsVS.validate(req.query)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function addNewHomeSectionVM(req, res, next) {
    const {
        error
    } = addHomeSectionVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function addOfferVM(req, res, next) {
    const {
        error
    } = addOfferVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    let isValid = idVS(req.params.id)

    if (!isValid) {
        next(boom.badData("Invalid Id"))
    }

    next()
}

function getOffersVM(req, res, next){
    let { error } = getOffersVS.validate(req.query)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function addCategoryVM(req, res, next){
    let { error } = addCategoryVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function addSubcategoryVM(req, res, next){
    let { error } = addSubcategoriesVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

export {
    addProdcutVM,
    queryIdVM,
    getProductsVM,
    addNewHomeSectionVM,
    addOfferVM,
    getOffersVM,
    addCategoryVM,
    addSubcategoryVM
}