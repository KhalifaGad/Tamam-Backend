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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: { 
        type: mongoose.Schema.Types.ObjectId,
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
    brandName: String,
    rating: {
        value: {
            type: Number,
            default: 5
        },
        count: {
            type: Number,
            default: 1
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
