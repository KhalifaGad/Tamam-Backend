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
        }).lean().then(doc => {
            return doc.addresses.filter(address => {
                return address._id + '' == addressId + ''
            })
        })
    },
    async addAddress(
        userId,
        lat,
        long,
        street,
        area,
        city,
        countryName,
        countryCode,
        buildingNo,
        floorNo,
        addressName,
        isMainAddress
    ) {
        let userAddress = null,
            address = {
                lat, long, street, area, city, buildingNo,
                floorNo, addressName, countryName, countryCode
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

            userAddress = await this.toggleMainAddress(userId, addressId, true)
            console.log(userAddress)
        }

        return {
            userAddress,
            err: null
        }
    },
    async toggleMainAddress(userId, addressId, isMain) {
        if (isMain) {
            return userAddressesModel.setMainAddress(userId, addressId)
        }

        const filter = {
            userId
        }

        let userAddresses = await userAddressesModel.findOne(filter),
            mainAddressIndex = userAddresses.addresses.map(address => {
                return address._id
            }).indexOf(addressId)

        userAddresses.addresses[mainAddressIndex].isMainAddres = false
        return await userAddresses.save()
    }
}

export { addressesModule }
