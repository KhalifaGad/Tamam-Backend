import mongoose from 'mongoose'

let userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "seller", "customer"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favourites: [mongoose.Schema.Types.ObjectId]
})

let UserModel = mongoose.model('User', userSchema)

export { UserModel }
