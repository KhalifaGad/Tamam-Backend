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
  async getOrderById(id) {
    return await orderModel.findById(id).catch(err => {
      console.log(err);
      return null;
    });
  },
  async confirmOrder(id) {
    let order = await orderModel.findById(id).catch(err => {
      console.log(err);
      return null;
    });
    if(!order) return null
    order.isConfirmed = true
    order.state = "SELLER PENDING"
    return order.save().catch(err => {
      console.log(err)
      return null
    })
  },
  async getSellerOrders(sellerId) {
    return await orderModel
      .find({
        sellerId,
        isConfirmed: true
      })
      .sort("-createdAt")
      .catch(err => {
        console.log(err);
        return [];
      });
  },
  async saveMultipleOrders(orders) {
    return await orderModel.insertMany(orders).catch(err => {
      console.log(err);
      return null;
    });
  }
};

export { ordersModule };
