import { paymentModule } from "../db/modules/payment";
import boom from "@hapi/boom";
import { ordersModule } from "../db/modules/orders";
import { modifyProductsGroup } from "../utils/productsHelper";
import { paymentTypesModule } from "../db/modules/paymentType";

async function paymentProcess(req, res, next) {
  let { userId, ordersIds, paymentTypeId } = req.body;
  let payments = [], data = {
    COD: null,
    visa: null,
    bankTransfer: null,
    sadad: null
  };

  let paymentType = await paymentTypesModule.getType(paymentTypeId);
  
  if (!paymentType) return next(boom.notFound("No payment type found"));

  if (paymentType.nameEn == "COD") {
    for (let orderId of ordersIds) {
      let payment = await paymentModule.addPayment({
        userId,
        orderId,
        isConfirmed: true
      });
      if (!payment) return next(boom.internal("Failer in adding payment"));
      let order = await ordersModule.confirmOrder(orderId, payment._id);
      modifyProductsGroup(order.products);
      payments.push(payment);
    }
    data.COD = payments
  }

  res.status(201).send({
    isSuccessed: true,
    data,
    error: null
  });
}

function sadadPayment(req, res, next) {}

function onlinePayment(req, res, next) {}

function bankTransfer(req, res, next) {}

export { paymentProcess, sadadPayment, onlinePayment, bankTransfer };
