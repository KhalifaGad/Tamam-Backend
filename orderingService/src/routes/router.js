import express from "express";
import { ordersRouter } from "./orders";
import { financeRouter } from "./finance";

const router = express.Router();

router.use("/orders", ordersRouter);
router.use("/finance", financeRouter);

router.use("/payment-types-images", express.static("paymentTypesImages"));

export { router };
