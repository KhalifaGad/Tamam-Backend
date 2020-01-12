import { addProductSchema } from '../utils/validationSchemas'

function addProdcutValidation(req, res, next) {
    const { error } = addProductSchema.validate(req.body)

    if(error) {
        next(error)
    }

    next()
}

export { addProdcutValidation }