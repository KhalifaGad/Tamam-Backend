import { Router } from "express";
import {
  getPaymentTypes,
  addPaymentType,
  editPaymentType
} from "../../controllers/paymentTypes";
import multer from "multer";
import path from "path";
import { addPaymentTypeVM, CODPaymentVM } from "../../middlewares/validationHandler";
import { getSeller, getCustomer } from "../../middlewares/authenticator";
import { CODPayment, sadadPayment, onlinePayment, bankTransfer } from "../../controllers/payment";
import { checkPaymentAmount, checkOrders } from "../../middlewares/paymentHelper";

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
  .post(upload.single("paymentIcon"), addPaymentTypeVM, getSeller, addPaymentType)
  .put(editPaymentType);

financeRouter.route("/payment/COD").post(CODPaymentVM, getCustomer, checkOrders, CODPayment);
financeRouter.route("/payment/sadad").post(getCustomer, sadadPayment);
financeRouter.route("/payment/online").post(checkPaymentAmount, getCustomer, onlinePayment);
financeRouter.route("/payment/bank-transfer").post(getCustomer, bankTransfer);

export { financeRouter };
