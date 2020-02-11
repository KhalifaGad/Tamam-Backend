import boom from '@hapi/boom'

import { ProductModel } from '../db/models/productModel';
import { requestAuth } from '../utils/authRequest';
import { favoritesModule } from '../db/modules/favs';

/**
 * Post "api/v1/products/product" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
// this function is missing autherization and authentication but for testing purposes,
// in the authorization we will get the seller data and put its id in the product,
// put for now I will set it 5e304d348ca5dd005fc89f12 as refrence to Khalifa Gad user
function addProduct(req, res, next) {
    req.body.seller = '5e304d348ca5dd005fc89f12'
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
// it accepts query strings: lang, skip, limit
// c = categoryId, s = subcategoryId,
// d = date ascending 'A' or descending 'D'
// CoI = country Id required
async function getProducts(req, res, next) {
    let favorites = [],
        auth = req.headers.authentication

    if (auth) {
        let user = await requestAuth(auth)
        if (user) {
            favorites = await favoritesModule.
                getUserFavs(user._id, req.query.lang || 'ar', 'No')
            favorites = await favorites.map(id => id.toString())
        }
    }

    let limit = parseInt(req.query.limit) || 0,
        skip = parseInt(req.query.skip) || 0,
        countryId = req.query.CoI || '5e3009b977a745002d1acbf7', // this will be changed to KSA CoI
        categoryId = req.query.c || null,
        subcategoryId = req.query.s || null,
        searchingQuery = {},
        dateSorting = req.query.d === 'D' ?
            '-uploadDate' : 'uploadDate'

    searchingQuery.availableCountries = countryId

    if (categoryId) {
        searchingQuery.categoryId = categoryId
    }

    if (subcategoryId) {
        searchingQuery.subcategoryId = subcategoryId
    }

    let retrevingLang =
        req.query.lang === "en"
            ? 'english'
            : 'arabic',
        categoryLang = req.query.lang === "en"
            ? 'nameEn'
            : 'nameAr'

    await ProductModel.find({
        ...searchingQuery
    })
        .limit(limit)
        .skip(skip)
        .select('-__v')
        .sort(dateSorting)
        .populate('categoryId')
        .lean()
        .then(docs => {
            docs = docs.map(product => {
                product.isFav = favorites.indexOf(product._id.toString()) == -1 ?
                    false : true
                product.name = product.name[retrevingLang]
                product.description = product.description[retrevingLang]
                product.keyImage = product.images[0] || ""
                product.categoryName = product.categoryId[categoryLang]
                product.categoryId = product.categoryId._id
                product.seller = "Khalifa Gad"
                return product
            })
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
