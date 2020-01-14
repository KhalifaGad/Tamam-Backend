import boom from '@hapi/boom'
import { 
    addUserValidationSchema, 
    addCountryValidationSchema 
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

export { 
    addUserValidation, 
    addCountryValidation
 }