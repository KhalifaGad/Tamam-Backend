import {
    addProductVS,
    idVS,
    getProductsVS,
    addHomeSectionVS,
    addOfferVS,
    getOffersVS
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

function prodcutIdVM(req, res, next) {
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

export {
    addProdcutVM,
    prodcutIdVM,
    getProductsVM,
    addNewHomeSectionVM,
    addOfferVM,
    getOffersVM
}