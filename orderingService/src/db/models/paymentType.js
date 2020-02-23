import mongoose from "mongoose";

let paymentTypeSchema = mongoose.Schema(
  {
    nameAr: {
      type: String,
      required: true
    },
    nameEn: {
      type: String,
      required: true
    },
    isActive: {
      type: String,
      default: false
    },
    imgURL: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

let paymentTypeModel = mongoose.model('PaymentType', paymentTypeSchema)

export { paymentTypeModel }
