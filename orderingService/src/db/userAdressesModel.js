import mongoose from 'mongoose'

let userAddressesSchema = mongoose.Schema({

})

let userAddressesModel = mongoose
    .model('UserAddresses', userAddressesSchema)

export {
    userAddressesModel as default
}
