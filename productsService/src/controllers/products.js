import { ProductModel } from '../db/productModel'
import boom from '@hapi/boom'
import { productsRefactoring, productRefactoring } from '../utils/refactoring'

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
            message: "created",
            data: doc
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
async function getProducts(req, res, next) {

    let limit = req.query.limit || 0,
        skip = req.query.skip || 0,
        lang = req.query.lang || "en"

    await ProductModel.find({})
        .limit(limit)
        .skip(skip)
        .select('-__v')
        .then(docs => {
            return res.status(200).send({
                message: "ok",
                data: productsRefactoring(docs, lang)
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
    await ProductModel.findById(req.params.id)
        .select('-__v')
        .then(doc => {
            console.log(doc)
            if (doc) {
                return res.status(200).send({
                    message: "ok",
                    data: productRefactoring(doc)
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
