import { Router } from 'express';
import multer from 'multer'

import path from 'path'

import {
    addProdcutVM,
    queryIdVM,
    getProductsVM,
    addOfferVM,
    getOffersVM
} from '../../middlewares/validationsHandler'
import {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} from '../../controllers/products'
import {
    getProductOffers,
    addOffer,
    editOffer,
    getOffers
} from '../../controllers/offers'
import {
    refactorAddProductReq
} from '../../middlewares/reqRefactoingHelper'

const productsRouter = Router()

let prductsImgsStorage = multer.diskStorage({
    destination: 'productsImages/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +
            Date.now() +
            path.extname(file.originalname))
    }
}),
    offersImgsStorage = multer.diskStorage({
        destination: 'offersImages/',
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' +
                Date.now() +
                path.extname(file.originalname))
        }
    })

let uploadProductImg = multer({
    prductsImgsStorage
}),
    uploadOfferImg = multer({
        offersImgsStorage
    })

// the full path is /api/v1/products
// get all products
productsRouter.route('/')
    .get(getProductsVM, getProducts)

// the full path is /api/v1/products/product
// add new product
productsRouter.route('/product')
    .post(uploadProductImg.array('photos', 6), addProdcutVM,
        refactorAddProductReq,
        addProduct)

// the full path is /api/v1/products/offers
productsRouter.route('/offers')
    .get(getOffersVM, getOffers)


// the full path is /api/v1/products/:id
productsRouter.route('/:id')
    .get(queryIdVM,
        getProduct) // get product by id
    .delete(deleteProduct) // delete product by id
    .put(updateProduct) // update product by id

// the full path is /api/v1/products/:id/offers
productsRouter.route('/:id/offers')
    .get(queryIdVM, getProductOffers)
    .post(/* uploadOfferImg.single('offerImg'), */ addOfferVM, addOffer)

// the full path is /api/v1/products/:id/offers/:id
productsRouter.route('/:productId/offers/:offerId')
    .put(editOffer)


export {
    productsRouter
}
