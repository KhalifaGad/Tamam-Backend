import boom from '@hapi/boom'

import { CategoryModel } from '../../../db/models/categoryModel'

function addCategory(req, res, next) {

    let imgUrl = ''

    if (req.file) {
        imgUrl = '/category-images/' + req.file.filename
    }

    new CategoryModel({
        ...req.body,
        imgUrl
    }).save().then(doc => {
        return res.status(201).send({
            isSuccessed: true,
            data: doc,
            error: null
        })
    }).catch(err => {
        return next(boom.notAcceptable(err.errmsg))
    })

}

async function addSubcategory(req, res, next) {
    let category = await CategoryModel.findById(req.params.id)

    if(!category) {
        return next(boom.notFound('There are no category for this id'))
    }

    category.subcategories.push(...req.body.subcategories)
    category.save().then(doc => {
        return res.status(201).send({
            isSuccessed: true,
            data: doc,
            error: null
        })
    }).catch(err => {
        return next(boom.internal(err.errmsg))
    })

}

export { addCategory, addSubcategory }
