import mongoose from "mongoose";

let productSchema = mongoose.Schema(
  {
    name: {
      arabic: {
        type: String,
        required: true,
        trim: true
      },
      english: {
        type: String,
        required: true,
        trim: true
      }
    },
    description: {
      arabic: {
        type: String,
        trim: true
      },
      english: {
        type: String,
        trim: true
      }
    },
    images: [String],
    price: {
      type: Number,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId
    },
    quantity: {
      val: {
        type: Number,
        required: true
      },
      measurement: {
        type: String,
        enum: ["kg", "pack", "unit"],
        required: true
      }
    },
    offerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer"
    },
    brandName: String,
    rating: {
      value: {
        type: Number,
        default: 5
      },
      count: {
        type: Number,
        default: 1
      }
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    uploadDate: {
      type: Date,
      default: new Date()
    },
    availableCountries: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true
    },
    estimatedDeliveryTime: {
      type: Number,
      required: true,
      default: 2
    },
    quantityWarning: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

productSchema.post("save", async function(doc, next) {
  if (doc.quantity.val < 5 && !doc.quantityWarning) {
    doc.quantityWarning = true;
    doc.save()
  }
  next()
});

let ProductModel = mongoose.model("Product", productSchema);

export { ProductModel };
