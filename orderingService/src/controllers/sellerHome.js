import { ordersModule } from "../db/modules/orders";
import { getLowQuantityProducts } from "../utils/productsHelper";

async function sellerHome(req, res, next) {
  let sellerId = req.body.sellerId,
    lang = req.query.lang;
  let orders = await ordersModule.getSellerOrders(sellerId);
  let lowQuantityProducts = await getLowQuantityProducts(
    req.headers.authentication,
    sellerId,
    lang
  );

  let totalOrdersCount = orders.length,
    newestOrders = orders.filter(order => order.state == "SELLER PENDING"),
    paidOrdersRatio =
      (orders.filter(order => order.isPaid).length / totalOrdersCount) * 100 ||
      0,
    customersCount = new Set(orders.map(order => order.userId)).size,
    completedOrdersCount = orders.filter(order => order.state == "TAMAM")
      .length,
    pendingOrdersCount = newestOrders.length,
    rejectedOrdersCount = orders.filter(order => order.state == "REFUSED")
      .length;

  console.log(lowQuantityProducts)

  res.status(200).send({
    isSuccessed: true,
    data: {
      totalOrdersCount,
      paidOrdersRatio,
      customersCount,
      completedOrdersCount,
      pendingOrdersCount,
      rejectedOrdersCount,
      newestOrders
    },
    error: null
  });
}

export { sellerHome };
