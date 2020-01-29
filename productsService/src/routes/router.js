import express from 'express'
import { productsRouter } from './products/index'
import managementRouter from './management/index'
import homeServiceRouter from './homeService/index'
import { customerRouter } from './customer'

const router = express.Router()

// the full path is /api/v1/products
router.use('/products', productsRouter)

// set the authentication and authorization middleware here
router.use('/management', managementRouter)

router.use('/customer', customerRouter)

router.use('/home-service', homeServiceRouter)

// serving static images
router.use('/product-images', express.static('productsImages'))
router.use('/category-images', express.static('categoryImages'))

export { router }