import mongoose from 'mongoose'

let offerSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    discountRatio: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    startingDate: {
        type: Date,
        default: new Date()
    },
    expirationDate: {
        type: Date,
        required: true
    }
})

let offerModel = mongoose.model('Offer', offerSchema)

export { offerModel }
