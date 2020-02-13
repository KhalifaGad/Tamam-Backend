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
    toggleMainAddress, 
    addAddressTest
} from '../../controllers/addresses'
import { checkCountry } from '../../middlewares/countryHandler'

const ordersRouter = Router()

ordersRouter.route('/user/:id')
    .get(mongooseIdReqParamVM, getUserOrders)

ordersRouter.route('/user/:id/addresses')
    .get(mongooseIdReqParamVM, getUserAddresses)
    .post(mongooseIdReqParamVM, addAddressVM, checkCountry, addAddress)

ordersRouter.route('/user/:userId/addresses/:addressId/main')
    .put(getAddressVM, toggleMainAddressVM, toggleMainAddress)

ordersRouter.route('/user/:userId/addresses/:addressId')
    .get(getAddressVM, getAdress)


ordersRouter.route('/')
    .post(makeOrderVM, makeOrder)

export { ordersRouter }
