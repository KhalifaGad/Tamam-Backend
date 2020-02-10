import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }],
        index: 1
    }
}, { versionKey: false })

let CartModel = mongoose.model('Cart', cartSchema)

export { CartModel }
