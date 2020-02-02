import mongoose from 'mongoose'

let categorySchema = mongoose.Schema({
    nameAr: {
        type: String,
        required: true,
        trim: true
    },
    nameEn: {
        type: String,
        required: true,
        trim: true
    },
    imgUrl: {
        type: String,
        required: true,
        trim: true
    },
    subcategories: {
        type: [
            {
                nameAr: {
                    type: String,
                    required: true,
                    trim: true
                },
                nameEn: {
                    type: String,
                    required: true,
                    trim: true
                }
            }
        ],
        index: 1
    }
})

let CategoryModel = mongoose.model('Category', categorySchema)

export { CategoryModel }
