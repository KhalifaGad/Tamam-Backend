import { Router } from 'express'

let cartRouter = Router()

//api/v1/customer/cart
cartRouter.route('/')
    .get()  // get products
    .post()
    .delete()

export { cartRouter }
