import Joi from '@hapi/joi'
import ImageExtension from 'joi-image-extension'

const JoiExtended = Joi.extend(ImageExtension)

const addProductSchema = JoiExtended.object({
    nameAr: JoiExtended.string()
        .alphanum()
        .min(3)
        .max(150)
        .required(),
    nameEn: JoiExtended.string()
        .alphanum()
        .min(3)
        .max(150)
        .required(),
    descriptionAr: JoiExtended.string()
        .alphanum()
        .min(30),
    descriptionEn: JoiExtended.string()
        .alphanum()
        .min(30),
    
})
