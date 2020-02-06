import mongoose from 'mongoose'

let userAddressesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    addresses: {
        type: [{
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
            floorNo: String,
            addressName: {
                type: String,
                required: true,
                unique: false
            },
            isMainAddres: {
                type: Boolean,
                default: false
            }
        }],
        index: 1
    }
}, { versionKey: false })

userAddressesSchema.statics.setMainAddress = function (userId, addressId) {
    const filter = {
        userId,
        'addresses._id': addressId
    },
        update = { isMainAddres: true }
    return this.findOneAndUpdate(filter, update, { new: true })
}

userAddressesSchema.pre('setMainAddress', async (next, userId) => {

    const filter = {
        userId,
        'addresses.isMainAddres': true
    },
        update = { isMainAddres: false }
    await this.findOneAndUpdate(filter, update, { new: true })
    next()
})

let userAddressesModel = mongoose
    .model('UserAddresses', userAddressesSchema)

export {
    userAddressesModel
}
