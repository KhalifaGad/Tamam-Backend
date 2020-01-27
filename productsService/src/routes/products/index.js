import {
    Router
} from 'express'
import express from 'express'
import {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} from '../../controllers/products'
import {
    addProdcutVM,
    prodcutIdVM,
    getProductsVM,
    addOfferVM
} from '../../middlewares/validationsHandler'
import {
    refactorAddProductReq
} from '../../middlewares/reqRefactoingHelper'
import multer from 'multer'
import path from 'path'
import {
    getProductOffers,
    addOffer,
    editOffer,
    getOffers
} from '../../controllers/offers'

const productsRouter = Router()

let storage = multer.diskStorage({
    destination: 'productsImages/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +
            Date.now() +
            path.extname(file.originalname))
    }
})

let upload = multer({
    storage
})

// serving static images
productsRouter.use('/images', express.static('productsImages'))

// the full path is /api/v1/products
// get all products
productsRouter.route('/')
    .get(getProductsVM, getProducts)

// the full path is /api/v1/products/product
// add new product
productsRouter.route('/product')
    .post(upload.array('photos', 6), addProdcutVM,
        refactorAddProductReq,
        addProduct)

// the full path is /api/v1/products/:id
productsRouter.route('/:id')
    .get(prodcutIdVM,
        getProduct) // get product by id
    .delete(deleteProduct) // delete product by id
    .put(updateProduct) // update product by id

// the full path is /api/v1/products/:id/offers
productsRouter.route('/:id/offers')
    .get(prodcutIdVM, getProductOffers)
    .post(addOfferVM, addOffer)

// the full path is /api/v1/products/:id/offers/:id
productsRouter.route('/:productId/offers/:offerId')
    .put(editOffer)

// the full path is /api/v1/products/offers
productsRouter.route('/offers')
    .get(getOffers)

export {
    productsRouter
}
