import { paymentModule } from "../db/modules/payment"
import boom from "@hapi/boom";
import { ordersModule } from "../db/modules/orders";

function CODPayment(req, res, next){
    let {
        userId,
        orderId
    } = req.body

    let payment = await paymentModule.addPayment({userId, orderId, isConfirmed: true})
    if(!payment) return next(boom.internal('Failer in adding payment'))

    ordersModule.confirmOrder(orderId)
    
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
