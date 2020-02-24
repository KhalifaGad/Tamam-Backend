import { paymentModel } from "../models/payment";

const paymentModule = {
  async addPayment(payment) {
    return await paymentModel({
      ...payment
    })
      .save()
      .catch(err => {
        console.log(err);
        return null;
      });
  },
  async confirmPayment(id) {
      let payment = await paymentModel.findById(id)
      payment.isConfirmed = true
      return await payment.save()
  },
  async getPayments() {
    return await paymentModel.find({}).catch(err => {
      console.log(err);
      return null;
    });
  },
  async getPaymentById(id) {
      return await paymentModel.findById(id)
  }
};

export { paymentModule }