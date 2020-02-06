import Joi from '@hapi/joi'

const addAddressVS = Joi.object({
    lat: Joi.number().required(),
    long: Joi.number().required(),
    street: Joi.string().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    buildingNo: Joi.string().required(),
    floorNo: Joi.string().required(),
    addressName: Joi.string().required(),
    isMainAddres: Joi.boolean(),
})

export { addAddressVS }
