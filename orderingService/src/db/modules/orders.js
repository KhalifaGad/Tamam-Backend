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
  async confirmOrder(id, paymentId) {
    let order = await this.getOrderById(id);
    if (!order) return null;
    order.isConfirmed = true;
    order.paymentId = paymentId;
    order.state = "SELLER PENDING";
    return order.save().catch(err => {
      console.log(err);
      return null;
    });
  },
  async getSellerOrders(sellerId, state = '') {
    let query = {
      sellerId,
      isConfirmed: true
    }
    if(state){
      query.state = state
    }
    return await orderModel
      .find({
        ...query
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
  },
  async acceptOrder(id) {
    let order = await this.getOrderById(id);
    if (!order) return null;
    order.state = "ACCEPTED";
    order.acceptingDate = new Date();
    return order.save().catch(err => {
      console.log(err);
      return null;
    });
  },
  async refuseOrder(id, refusingNote = "") {
    let order = await this.getOrderById(id);
    if (!order) return null;
    order.state = "REFUSED";
    order.refusingDate = new Date();
    order.refusingNote = refusingNote;
    return order.save().catch(err => {
      console.log(err);
      return null;
    });
  },
  async changeOrderState(id, state) {
    let order = await this.getOrderById(id);
    if (!order) return null;
    order.state = state;
    return order.save().catch(err => {
      console.log(err);
      return null;
    });
  },
  async changeEstimatedTime(id, time) {
    let order = await this.getOrderById(id);
    if (!order) return null;
    order.estimatedTime = time;
    return order.save().catch(err => {
      console.log(err);
      return null;
    });
  }
};

export { ordersModule };
