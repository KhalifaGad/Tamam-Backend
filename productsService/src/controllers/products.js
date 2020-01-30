import { ProductModel } from '../db/productModel'
import boom from '@hapi/boom'

/**
 * Post "api/v1/products/product" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
// this function is missing autherization and authentication but for testing purposes
function addProduct(req, res, next) {

    let product = new ProductModel({
        ...req.body
    })

    product.save().then(doc => {
        res.status(201).send({
            isSuccessed: true,
            data: doc,
            error: null
        })
    }).catch(err => {
        next(boom.internal(err))
    })
}

/**
 * Get "api/v1/products" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
// it accepts query strings: lang, page, limit
// c = categoryId, s = subcategoryId, 
//d = date ascending 'A' or descending 'D'
async function getProducts(req, res, next) {

    let limit = parseInt(req.query.limit) || 0,
        page = parseInt(req.query.page) || 0,
        categoryId = req.query.c || null,
        subcategoryId = req.query.s || null,
        searchingQuery = {},
        dateSorting = req.query.d === 'D' ?
            '-uploadDate' : 'uploadDate'

    if (categoryId) {
        searchingQuery.categoryId = categoryId
    }

    if (subcategoryId) {
        searchingQuery.subcategoryId = subcategoryId
    }

    let execludingQuery = req.query.lang === "en" ?
        '-name.arabic -description.arabic'
        : '-name.english -description.english'

    await ProductModel.find({
        ...searchingQuery
    })
        .limit(limit)
        .skip(page)
        .sort(dateSorting)
        .select('-__v ' + execludingQuery)
        .then(docs => {
            return res.status(200).send({
                isSuccessed: true,
                data: docs,
                error: null
            })
        }).catch((err) => {
            next(boom.internal(err))
        })
}

/**
 * Get "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
// it accepts query strings: lang
async function getProduct(req, res, next) {
    let execludingQuery = req.query.lang === "en" ?
        '-name.arabic -description.arabic'
        : '-name.english -description.english'
    await ProductModel.findById(req.params.id)
        .select('-__v ' + execludingQuery)
        .then(doc => {
            if (doc) {
                return res.status(200).send({
                    isSuccessed: true,
                    data: doc,
                    error: null
                })
            }
            next(boom.notFound("product not found"))
        }).catch((err) => {
            next(boom.internal(err))
        })
}

/**
 * Delete "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function deleteProduct(req, res, next) {

}

/**
 * Put "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function updateProduct(req, res, next) {

}

export {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
