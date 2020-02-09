import { Router } from 'express'
import {
    makeOrder,
    getUserOrders
} from '../../controllers/orders'
import {
    makeOrderVM,
    mongooseIdReqParamVM,
    getAddressVM,
    addAddressVM,
    toggleMainAddressVM
} from '../../middlewares/validationHandler'
import { 
    getUserAddresses, 
    addAddress, 
    getAdress, 
    toggleMainAddress 
} from '../../controllers/addresses'

const ordersRouter = Router()

ordersRouter.route('/user/:id')
    .get(mongooseIdReqParamVM, getUserOrders)

ordersRouter.route('/user/:id/addresses')
    .get(mongooseIdReqParamVM, getUserAddresses)
    .post(mongooseIdReqParamVM, addAddressVM, addAddress)

ordersRouter.route('/user/:userId/addresses/:addressId/main')
    .put(getAddressVM, toggleMainAddressVM, toggleMainAddress)

ordersRouter.route('/user/:userId/addresses/:addressId')
    .get(getAddressVM, getAdress)


ordersRouter.route('/')
    .post(makeOrderVM, makeOrder)

export { ordersRouter }
