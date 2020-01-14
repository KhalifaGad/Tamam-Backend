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
    countryCityIds: {
        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
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
