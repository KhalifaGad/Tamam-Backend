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
    countryCityId: String,
    role: {
        type: String,
        enum: ["admin", "seller", "customer"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    favourites: [mongoose.Schema.Types.ObjectId],
    points: {
        type: Number,
        default: 0
    }
})

let UserModel = mongoose.model('User', userSchema)

export { UserModel }
