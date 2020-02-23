import mongoose from "mongoose";

let paymentSchema = mongoose.Schema(
  {
    paymentType: {
      type: String,
      enum: ["COD", "SADAD", "ONLINE PAYMENT", "BANK TRANSFER"],
      default: "COD"
    },
    isConfirmed: {
      type: Boolean,
      default: false
    },
    amount: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Order'
    }, 
    bankId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true, versionKey: false }
);

let paymentModel = mongoose.model("Payment", paymentSchema);

export { paymentModel }
