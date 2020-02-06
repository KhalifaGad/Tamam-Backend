import mongoose from 'mongoose'

let productSchema = mongoose.Schema({
    name: {
        arabic: {
            type: String,
            required: true,
            trim: true
        },
        english: {
            type: String,
            required: true,
            trim: true
        }
    },
    description: {
        arabic: {
            type: String,
            trim: true
        },
        english: {
            type: String,
            trim: true
        }
    },
    images: [String],
    price: {
        type: Number,
        required: true
    },
    categoryId: mongoose.Schema.Types.ObjectId,
    subcategoryId: mongoose.Schema.Types.ObjectId,
    quantity: {
        val: {
            type: Number,
            required: true
        },
        measurement: {
            type: String,
            enum: ["kg", "pack", "unit"],
            required: true
        }
    },
    offerId: mongoose.Schema.Types.ObjectId,
    isTurkish: {
        type: Boolean,
        default: true
    },
    uploadDate: {
        type: Date,
        default: new Date()
    },
    availableCountries: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
}, { versionKey: false })

let ProductModel = mongoose.model('Product', productSchema)

export { ProductModel }
