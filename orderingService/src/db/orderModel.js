import mongoose from 'mongoose'

let orderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    offerId: mongoose.Schema.Types.ObjectId,
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderingDate: {
        type: Date,
        default: new Date()
    },
    acceptingDate: Date,
    refusingDate: Date,
    refusingNote: {
        type: String,
        trim: true
    },
    estimatedTime: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sellerId: mongoose.Schema.Types.ObjectId,
    total: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    State: {
        type: String,
        enum: [
            'PENDING',
            'ACCEPTED',
            'MANUFACTORY',
            'STORED',
            'SHIPPED FROM ORIGIN COUNTRY',
            'DELIVERED DESTINATION COUNTRY',
            'TAMAM',
            'REFUSED'
        ],
        default: 'PENDING'
    }
})

let orderModel = mongoose.model('OrderModel', orderSchema)

export { orderModel as default }
