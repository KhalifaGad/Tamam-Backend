import mongoose from 'mongoose'

let verificationSchema = mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { versionKey: false })

let VerificationModel = mongoose.model('Verification',
    verificationSchema)

export { VerificationModel }
