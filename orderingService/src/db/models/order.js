import mongoose from "mongoose";

let orderSchema = mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          offerId: mongoose.Schema.Types.ObjectId,
          price: {
            type: Number,
            required: true
          },
          total: {
            type: Number,
            required: true
          }
        }
      ],
      required: true
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserAddresses.addresses"
    },
    acceptingDate: Date,
    refusingDate: Date,
    refusingNote: {
      type: String,
      trim: true
    },
    estimatedTime: {
      type: Number,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    sellerId: mongoose.Schema.Types.ObjectId,
    orderTotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 5
    },
    grandTotal: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      enum: [
        "PAYMENT PENDING",
        "CANCELED",
        "SELLER PENDING",
        "ACCEPTED",
        "MANUFACTORY",
        "STORED",
        "SHIPPED FROM ORIGIN COUNTRY",
        "DELIVERED DESTINATION COUNTRY",
        "SHIPPED TO USER ADDRESS",
        "TAMAM",
        "REFUSED"
      ],
      default: "PAYMENT PENDING",
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isConfirmed: {
      type: Boolean,
      default: false
    },
    paymentId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true, versionKey: false }
);

let orderModel = mongoose.model("Order", orderSchema);

export { orderModel };
