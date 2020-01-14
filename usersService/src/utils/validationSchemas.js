import Joi from '@hapi/joi'

const addUserSchema = Joi.object({
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
    countryCityId: Joi.string().required()
})

export { addUserValidationSchema }
