import boom from '@hapi/boom'
import { 
    addUserValidationSchema, 
    addCountryValidationSchema, 
    verifyUserSchema,
    resendVerificationSchema
} from '../utils/validationSchemas'

function addUserValidation(req, res, next) {
    const { error } = addUserValidationSchema.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()

}

function addCountryValidation(req, res, next){
    const { error } = addCountryValidationSchema.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function verifyUserMiddleware(req, res, next){
    const { error } = verifyUserSchema.validate(req.body)

    if(error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function rsndVrfcMiddleware(req, res, next){
    const { error } = resendVerificationSchema.validate(req.body)

    if(error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

export { 
    addUserValidation, 
    addCountryValidation,
    verifyUserMiddleware,
    rsndVrfcMiddleware
 }