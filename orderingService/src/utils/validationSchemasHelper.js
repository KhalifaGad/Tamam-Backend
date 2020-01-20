import mongoose from 'mongoose'

function isMongooseId(value, helpers) {
    try {
        let check = value == new mongoose.Types.ObjectId(value)
            ? true : false

        if (!check) {
            return helpers.error('any.invalid')
        }
        return value
    } catch (err) {
        return helpers.error('any.invalid')
    }
}

export { isMongooseId }
