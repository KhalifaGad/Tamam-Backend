import { Router } from 'express'

const productsRouter = Router()

// the full path is /api/v1/products
// get all products
productsRouter.route('/')
    .get()

// the full path is /api/v1/products/product
// add new product
productsRouter.route('/product')
    .post()

// the full path is /api/v1/products/:id
productsRouter.route('/:id')
    .get() // get product by id
    .delete() // delete product by id
    .put() // update product by id

export { productsRouter }