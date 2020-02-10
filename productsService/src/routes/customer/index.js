import { Router } from 'express'
import { categoriesRouter } from './categories'
import { cartRouter } from './cart'

let customerRouter = Router()

customerRouter.use('/categories', categoriesRouter)
// api/v1/customer/cart
customerRouter.use('/cart', cartRouter)

export { customerRouter }