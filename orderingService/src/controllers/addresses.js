import boom from '@hapi/boom'
import { addressesModule } from '../db/modules/addresses'

async function getUserAddresses(req, res, next) {
    let userId = req.params.id
    let userAddresses = await addressesModule.getUserAddresses(userId)

    if(!userAddresses){
        return res.send({
            isSuccessed: false,
            data: null,
            error: "will be tested tomorrow"
        })
    }

    return res.status(200).send({
        isSuccessed: true,
        data: userAddresses,
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


        if(err){
            return next(boom.internal(err))
        }

        return res.status(201).send({
            isSuccessed: true,
            data: userAddress,
            error: null
        })
}

export {
    getUserAddresses,
    getAdress,
    addAddress
}
