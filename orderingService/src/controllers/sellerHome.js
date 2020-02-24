import { ordersModule } from "../db/modules/orders";

async function sellerHome(req, res, next) {
  let sellerId = req.body.sellerId;

  let orders = await ordersModule.getSellerOrders(sellerId);

  let totalOrdersCount = orders.length,
    newestOrders = orders.filter(order => order.State == "SELLER PENDING"),
    paidOrdersRatio =
      (orders.filter(order => order.isPaid).length / totalOrdersCount) * 100 || 0,
    customersCount = new Set(orders.map(order => order.userId)).size,
    completedOrdersCount = orders.filter(order => order.State == "TAMAM")
      .length,
    pendingOrdersCount = newestOrders.length,
    rejectedOrdersCount = orders.filter(order => order.State == "REFUSED")
      .length;

  res.status(200).send({
    isSuccessed: true,
    data:{
      totalOrdersCount,
      paidOrdersRatio,
      customersCount,
      completedOrdersCount,
      pendingOrdersCount,
      rejectedOrdersCount,
      newestOrders
    },
    error: null
  })
}

export { sellerHome };
