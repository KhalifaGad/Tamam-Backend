import { ordersModule } from "../db/modules/orders"

async function sellerHome(req, res, next){
    let sellerId = req.body.sellerId

    let orders = await ordersModule.getSellerOrders(sellerId)

    console.log(orders)

    res.send('ok')
}

export { sellerHome }
