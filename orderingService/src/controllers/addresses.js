import boom from '@hapi/boom'
import { addressesModule } from '../db/modules/addresses'

async function getUserAddresses(req, res, next) {
    let userId = req.params.id
    let userAddresses = await addressesModule.getUserAddresses(userId)

    if (!userAddresses) {
        return res.status(404).send({
            isSuccessed: false,
            data: [],
            error: "Resource not found!"
        })
    }

    return res.status(200).send({
        isSuccessed: true,
        data: userAddresses.addresses,
        error: null
    })

}

function getAdress(req, res, next) {

}

async function addAddress(req, res, next) {
    const {
        lat,
        long,
        street,
        area,
        city,
        buildingNo,
        floorNo,
        addressName,
        isMainAddress = false
    } = req.body,
        userId = req.params.id

    let {
        userAddress,
        err
    } = await addressesModule.addAddress(userId, lat, long, street,
        area, city, buildingNo, floorNo, addressName, isMainAddress)


    if (err) {
        return next(boom.internal(err))
    }

    return res.status(201).send({
        isSuccessed: true,
        data: userAddress,
        error: null
    })
}

async function toggleMainAddress(req, res, next) {
    const { userId, addressId } = req.params,
        isMain = req.body.isMain == "false"? false : true
    let address =
        await addressesModule.toggleMainAddress(userId, addressId, isMain)

    if (!address) {
        res.status(404).send({
            isSuccessed: false,
            data: null,
            error: "Resource not found!"
        })
    }

    res.status(200).send({
        isSuccessed: true,
        data: address.addresses,
        error: null
    })

}

export {
    getUserAddresses,
    getAdress,
    addAddress,
    toggleMainAddress
}
