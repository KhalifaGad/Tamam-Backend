import { ordersModule } from "../db/modules/orders"

async function sellerHome(req, res, next){
    let sellerId = req.body.sellerId

    let orders = await ordersModule.getSellerOrders(sellerId)

    let totalOrdersCount = orders.length,
        paidOrdersRatio = (orders.filter(order => order.isPaid).length / totalOrdersCount) * 100,
        customersCount = new Set(orders.map(order => order.userId)).size

    console.log(totalOrdersCount)
    console.log(paidOrdersRatio)
    console.log(customersCount)


    res.send('ok')
}

export { sellerHome }
