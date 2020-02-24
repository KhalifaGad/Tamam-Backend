import { ordersModule } from "../db/modules/orders"
import boom from "@hapi/boom";

async function checkOrder(req, res, next){
    let id = req.params.id,
    order = await ordersModule.getOrderById(id)

    if(!order) return next(boom.notFound('Order not found!'))

    if(order.sellerId + '' !== req.body.sellerId) return next(boom.unauthorized('Sellers not are the same'))

    next()
}

export { checkOrder }
