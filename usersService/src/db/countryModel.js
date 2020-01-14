import mongoose from 'mongoose'

let countrySchema = mongoose.Schema({
    nameAr: {
        type: String,
        required: true,
        trim: true
    },
    nameEn: {
        type: String,
        required: true,
        trim: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cities: {
        type: [{
            nameAr: {
                type: String,
                required: true,
                trim: true
            },
            nameEn: {
                type: String,
                required: true,
                trim: true
            },
            isBlocked: {
                type: Boolean,
                default: false
            }
        }],
        index: 1
    },
    flagImage: String
})

let countryModel = mongoose.model('Country', countrySchema)

export { countryModel }
