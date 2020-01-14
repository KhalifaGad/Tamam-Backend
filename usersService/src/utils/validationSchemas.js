import Joi from '@hapi/joi'

const addUserValidationSchema = Joi.object({
    fName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    lName: Joi.string()
        .min(3)
        .max(20)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(4)
        .required(),
    role: Joi.string()
        .valid("admin", "seller", "customer"),
    countryCityIds: Joi.string().custom((value, helpers) => {
        try {
            check1 =
                value.countryId == new mongoose.Types.ObjectId(value.countryId)
                    ? true : false
            check2 =
                value.cityId == new mongoose.Types.ObjectId(value.cityId)
                    ? true : false
            
            if(check1 && check2){
                return value
            } else {
                return helpers.error('Invalid Ids') 
            }

        } catch (err) {
            return helpers.error('Invalid Ids')
        }

    }, 'custom validation')
})

const addCountryValidationSchema = Joi.object({
    nameAr: Joi.string().required(),
    namerEn: Joi.string().required(),
    cities: Joi.array().items(Joi.object({
        nameAr: Joi.string().required(),
        namerEn: Joi.string().required()
    }))
})

export {
    addUserValidationSchema,
    addCountryValidationSchema
}
