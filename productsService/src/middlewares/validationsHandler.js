import { 
    addProductSchema, 
    idValidation 
} from '../utils/validationSchemas'
import boom from '@hapi/boom'

function addProdcutValidation(req, res, next) {
    const { error } = addProductSchema.validate(req.body)

    if (error) {
        next(boom.badData(error.details[0].message))
    }

    next()
}

function prodcutIdValidation(req, res, next) {
    let isValid = idValidation(req.params.id)

    if (!isValid) {
        next(boom.badData("Invalid Id"))
    }

    next()
}

export { addProdcutValidation, prodcutIdValidation }