import mongoose from 'mongoose'

const favSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        index: 1
    }
}, { versionKey: false })

let FavsModel = mongoose.model('Favourites', favSchema)

export { FavsModel }
