import mongoose from "mongoose";

let orderSchema = mongoose.Schema(
  {
    productsIds: {
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
    issuingDate: {
      type: Date,
      default: new Date()
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
    State: {
      type: String,
      enum: [
        "PENDING",
        "ACCEPTED",
        "MANUFACTORY",
        "STORED",
        "SHIPPED FROM ORIGIN COUNTRY",
        "DELIVERED DESTINATION COUNTRY",
        "SHIPPED TO USER ADDRESS",
        "TAMAM",
        "REFUSED"
      ],
      default: "PENDING"
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paymentType: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD"
    }
  },
  { versionKey: false }
);

let orderModel = mongoose.model("OrderModel", orderSchema);

export { orderModel as default };
