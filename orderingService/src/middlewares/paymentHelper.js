import { ordersModule } from "../db/modules/orders";
import boom from "@hapi/boom";

async function checkPaymentAmount(req, res, next) {
  let { orderId, amount } = req.body;
  let order = await ordersModule.getOrderById(orderId);
  if (!order) return next(boom.badRequest("No order found!"));

  if (Math.floor(order.grandTotal) !== Math.floor(amount)) {
    return next(boom.badRequest("Amount not matched the order grand total"));
  }

  next();
}

async function checkOrder(req, res, next) {
  let orderId = req.body.orderId;
  let order = await ordersModule.getOrderById(orderId);
  if (!order) return next(boom.badRequest("No order found!"));
  if(order.isConfirmed) return next(boom.badRequest("Order previously paid"));

  next();
}

export { checkPaymentAmount, checkOrder };
