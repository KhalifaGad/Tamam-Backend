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
        },
        images: [String],
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        subcategory: String,
        quantity: {
            val: {
                type: Number,
                required: true
            },
            measurment: {
                type: String,
                enum: ["kg", "pack", "unit"],
                required: true
            }
        },
        offerId: mongoose.Schema.Types.ObjectId
    }
})

let productModel = mongoose.model('Product', productSchema)

export { productModel }