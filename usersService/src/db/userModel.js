import mongoose from 'mongoose'

let userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "SELLER", "CUSTOMER"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: [mongoose.Schema.Types.ObjectId],
    points: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastActiveDevice: {
        type: String,
        enum: ["ANDROID", "IOS", "WEB"]
    }
})

let UserModel = mongoose.model('User', userSchema)

export { UserModel }
