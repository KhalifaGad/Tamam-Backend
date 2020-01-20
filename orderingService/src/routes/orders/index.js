import { Router } from 'express'
import {
    makeOrder,
    getUserOrders
} from '../../controllers/orders'
import { 
    makeOrderVM,
    mongooseIdReqParamVM
} from '../../middlewares/validationHandler'

const ordersRouter = Router()

ordersRouter.route('/user/:id')
    .get(mongooseIdReqParamVM, getUserOrders)


ordersRouter.route('/')
    .post(makeOrderVM, makeOrder)

export { ordersRouter }
