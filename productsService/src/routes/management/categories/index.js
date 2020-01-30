import express from 'express'
import {
    addCategory, 
    addSubcategory
} from '../../../controllers/managment/categories'
import { getCategories } from '../../../controllers/categories'
import multer from 'multer'
import path from 'path'
import { 
    addCategoryVM, 
    queryIdVM,
    addSubcategoryVM
} from '../../../middlewares/validationsHandler'

const categoriesRouter = express.Router()

let storage = multer.diskStorage({
    destination: 'categoryImages/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +
            Date.now() +
            path.extname(file.originalname))
    }
}),
    upload = multer({
        storage
    })


categoriesRouter.route('/')
    .get(getCategories)

categoriesRouter.route('/category')
    .post(upload.single('categoryImage'), addCategoryVM, addCategory)

categoriesRouter.route('/:id/subcategories')
    .post(queryIdVM, addSubcategoryVM, addSubcategory)

export { categoriesRouter }