import { ordersModule } from "../db/modules/orders"

async function sellerHome(req, res, next){
    let sellerId = req.body.sellerId

    let orders = await ordersModule.getSellerOrders(sellerId)

    let totalOrdersCount = orders.length,
        paidOrdersRatio = (orders.filter(order => order.isPaid).length / totalOrdersCount) * 100,
        customersCount = new Set(orders.map(order => order.userId)).size,
        completedOrdersCount = orders.filter(order => order.State == 'TAMAM').length,
        pendingOrdersCount = orders.filter(order => order.State == 'PENDING').length,
        rejectedOrdersCount = orders.filter(order => order.State == 'REFUSED').length

    console.log(orders)
    console.log(totalOrdersCount)
    console.log(paidOrdersRatio)
    console.log(customersCount)
    console.log(completedOrdersCount)
    console.log(pendingOrdersCount)
    console.log(rejectedOrdersCount)


    res.send('ok')
}

export { sellerHome }
