import boom from '@hapi/boom'
import {
    mongooseIdVS,
    getAddressVS
} from '../utils/validationSchemas/mongooseId'
import { addAddressVS, toggleMainAddressVS } from '../utils/validationSchemas/addresses'

/* 
    --------------typography-------------
            VM => ValidationMiddleware
*/

function makeOrderVM(req, res, next) {

    const { error } = makeOrderVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function mongooseIdReqParamVM(req, res, next) {
    const { error } = mongooseIdVS.validate(req.params)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function getAddressVM(req, res, next) {
    const { error } = getAddressVS.validate(req.params)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function addAddressVM(req, res, next) {
    const { error } = addAddressVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function toggleMainAddressVM(req, res, next){
    const { error } = toggleMainAddressVS.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

export {
    makeOrderVM,
    mongooseIdReqParamVM,
    getAddressVM,
    addAddressVM,
    toggleMainAddressVM
}
