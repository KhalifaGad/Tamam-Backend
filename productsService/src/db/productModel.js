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
    category: {
        arabic: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        }
    },
    subcategory: {
        arabic: String,
        english: String
    },
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
    }
})

let ProductModel = mongoose.model('Product', productSchema)

export { ProductModel }
