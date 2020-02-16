import { ContactUsModel } from "../db/contactUs"
import boom from '@hapi/boom'

async function addMessage(req, res, next){

    await ContactUsModel({
        ...req.body
    }).save().then(doc => {
        res.status(201).send({
            isSuccessed: true,
            data: doc,
            error: null
        })
    }).catch(err => {
        next(boom.internal(err))
    })

}

export { addMessage }
