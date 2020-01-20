import { Router } from 'express'
import { productsRouter } from './products/index'
import managementRouter from './management/index'
import homeServiceRouter from './homeService/index'

const router = Router()

// the full path is /api/v1/products
router.use('/products', productsRouter)

router.use('/management', managementRouter)

router.use('/home-service', homeServiceRouter)

export { router }