import { ordersModule } from "../db/modules/orders"

async function sellerHome(req, res, next){
    let sellerId = req.body.sellerId

    let orders = await ordersModule.getSellerOrders(sellerId)

    let totalOrdersCount = orders.length,
        paidOrdersRatio = (orders.filter(order => order.isPaid).length / totalOrdersCount) * 100

    console.log(totalOrdersCount)
    console.log(paidOrdersRatio)


    res.send('ok')
}

export { sellerHome }
