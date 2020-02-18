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
            countryName: {
                type: String,
                required: true
            },
            countryCode: {
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

userAddressesSchema.statics.setMainAddress = async function (userId, addressId) {
    const filter = {
        userId,
        'addresses._id': addressId
    }

    let userAddresses = await this.findOne(filter),
        mainAddressIndex = userAddresses.addresses.map(address => {
            return address._id
        }).indexOf(addressId)

    userAddresses.addresses[mainAddressIndex].isMainAddres = true

    return await userAddresses.save()

}

userAddressesSchema.pre('setMainAddress', async function (next, userId) {

    const filter = {
        userId,
        'addresses.isMainAddres': true
    }

    let userAddresses = await this.findOne(filter)
    if (!userAddresses) next()

    let mainAddressIndex = userAddresses.addresses.map(address => {
        return address.isMainAddres
    }).indexOf(true)

    userAddresses.addresses[mainAddressIndex].isMainAddres = false
    await userAddresses.save()
    next()
})

let userAddressesModel = mongoose
    .model('UserAddresses', userAddressesSchema)

export {
    userAddressesModel
}
