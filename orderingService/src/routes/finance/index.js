import { Router } from "express";
import {
  getPaymentTypes,
  addPaymentType,
  editPaymentType
} from "../../controllers/paymentTypes";
import multer from "multer";
import path from "path";
import { addPaymentTypeVM } from "../../middlewares/validationHandler";
import { getUser } from "../../middlewares/authenticator";

const financeRouter = Router();

let storage = multer.diskStorage({
    destination: "paymentTypesImages/",
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
  upload = multer({
    storage
  });

financeRouter
  .route("/payment-types")
  .get(getPaymentTypes)
  .post(
    upload.single("paymentIcon"),
    addPaymentTypeVM,
    getUser,
    addPaymentType
  )
  .put(editPaymentType);

export { financeRouter };
