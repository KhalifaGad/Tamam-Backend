import { orderModel } from "../models/order";

const ordersModule = {
  async saveOrder(order) {
    return await orderModel({
        ...order
    })
      .save()
      .catch(err => {
        console.log(err);
        return null;
      });
  }
};

export { ordersModule }
