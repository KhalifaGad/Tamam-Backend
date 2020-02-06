import { userAddressesModel } from "../models/addresses"

const addressesModule = {
    async getUserAddresses(userId) {
        return userAddressesModel.findOne({
            userId
        })
    },
    async getAddress(userId, addressId) {
        return userAddressesModel.findOne({
            userId,
            'addresses._id': addressId
        })
    },
    async addAddress(
        userId,
        lat,
        long,
        street,
        area,
        city,
        buildingNo,
        floorNo,
        addressName,
        isMainAddress
    ) {
        let userAddress = null,
            address = {
                lat, long, street, area, city, buildingNo,
                floorNo, addressName
            },
            updateQuery = {
                $push: { addresses: address }
            }
        try {
            userAddress =
                await userAddressesModel
                    .findOneAndUpdate({ userId },
                        updateQuery,
                        { new: true, upsert: true })
                    .lean()
        } catch (err) {
            return {
                userAddress,
                err
            }
        }

        if (isMainAddress) {
            let indexOfAddress = userAddress.addresses.map(address => {
                return address.addressName
            }).indexOf(addressName),

                addressId = userAddress.addresses[indexOfAddress]._id

                userAddress = await this.makeItMain(userId, addressId)
        }

        return {
            userAddress,
            err: null
        }
    },
    async makeItMain(userId, addressId) {
        return userAddressesModel.setMainAddress(userId, addressId)
    }
}

export { addressesModule }
