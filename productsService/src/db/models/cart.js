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

cartSchema.post('save', async function (doc, next) {
    let zeroQuantityIndex = 
        await doc.products.map(obj => obj.quantity).indexOf(0)
    if(zeroQuantityIndex < 0){
        next()
    } else {
        doc.products.splice(zeroQuantityIndex, 1)
        await doc.save()
        next()
    }
})

let CartModel = mongoose.model('Cart', cartSchema)

export { CartModel }
