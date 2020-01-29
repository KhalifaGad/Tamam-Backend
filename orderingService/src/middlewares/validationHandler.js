import boom from '@hapi/boom'
import { makeOrderVS } from '../utils/validationSchemas/makeOrder'

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
    const { error } = addUserValidationSchema.validate(req.params)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

export { makeOrderVM, mongooseIdReqParamVM }
