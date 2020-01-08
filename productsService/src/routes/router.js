import { Router } from 'express'
import { productsRouter } from './products/index'

const router = Router()

// the full path is /api/v1/products
router.use('/products', productsRouter)

export { router }