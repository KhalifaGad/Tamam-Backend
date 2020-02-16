import mongoose from 'mongoose'

let contactUsSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { versionKey: false })

let ContactUsModel = mongoose.model('ContactUs', contactUsSchema)

export { ContactUsModel }
