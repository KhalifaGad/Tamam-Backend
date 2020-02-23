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
  },
  async getSellerOrders(sellerId) {
    return await orderModel
      .find({
        sellerId
      })
      .sort("-createdAt")
      .catch(err => {
        console.log(err);
        return [];
      });
  },
  async saveMultipleOrders(orders){
    return await orderModel.insertMany(orders).catch(err => {
      console.log(err)
      return null
    })
  }
};

export { ordersModule };
