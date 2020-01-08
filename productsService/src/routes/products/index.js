import { Router } from 'express'
import {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} from '../../controllers/products'

const productsRouter = Router()

// the full path is /api/v1/products
// get all products
productsRouter.route('/')
    .get(getProducts)

// the full path is /api/v1/products/product
// add new product
productsRouter.route('/product')
    .post(addProduct)

// the full path is /api/v1/products/:id
productsRouter.route('/:id')
    .get(getProduct) // get product by id
    .delete(deleteProduct) // delete product by id
    .put(updateProduct) // update product by id

export { productsRouter }