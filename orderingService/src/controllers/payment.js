import { paymentModule } from "../db/modules/payment"
import boom from "@hapi/boom";
import { ordersModule } from "../db/modules/orders";
import { modifyProductsGroup } from "../utils/productsHelper";

async function CODPayment(req, res, next){
    let {
        userId,
        orderId
    } = req.body

    let payment = await paymentModule.addPayment({userId, orderId, isConfirmed: true})
    if(!payment) return next(boom.internal('Failer in adding payment'))

    let order = await ordersModule.confirmOrder(orderId, payment._id)
    modifyProductsGroup(order.products)
    
    res.status(201).send({
        isSuccessed: true,
        data: payment,
        error: null
    })



}

function sadadPayment(req, res, next){

}

function onlinePayment(req, res, next){

}

function bankTransfer(req, res, next){

}

export {
    CODPayment,
    sadadPayment,
    onlinePayment,
    bankTransfer
}
