import mongoose from 'mongoose'

let userAddressesSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    buildingNo: String,
    floorNo: Number,
    landmark: String,
    addressNote: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

let userAddressesModel = mongoose
    .model('UserAddresses', userAddressesSchema)

export {
    userAddressesModel as default
}
