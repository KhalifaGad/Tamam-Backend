import { Router } from "express";
import { makeOrder, getUserOrders, editOrder } from "../../controllers/orders";
import {
  makeOrderVM,
  mongooseIdReqParamVM,
  getAddressVM,
  addAddressVM,
  toggleMainAddressVM,
  updateOrderVM
} from "../../middlewares/validationHandler";
import {
  getUserAddresses,
  addAddress,
  getAdress,
  toggleMainAddress
} from "../../controllers/addresses";
import { checkCountry } from "../../middlewares/countryHandler";
import { sellerHome } from "../../controllers/sellerHome";
import { getSeller } from "../../middlewares/authenticator";
import { checkOrder } from "../../middlewares/orderHelper";

const ordersRouter = Router();

ordersRouter.route("/user/:id").get(mongooseIdReqParamVM, getUserOrders);

ordersRouter
  .route("/user/:id/addresses")
  .get(mongooseIdReqParamVM, getUserAddresses)
  .post(mongooseIdReqParamVM, addAddressVM, checkCountry, addAddress);

ordersRouter
  .route("/user/:userId/addresses/:addressId/main")
  .put(getAddressVM, toggleMainAddressVM, toggleMainAddress);

ordersRouter
  .route("/user/:userId/addresses/:addressId")
  .get(getAddressVM, getAdress);

ordersRouter.route("/").post(makeOrderVM, makeOrder);
ordersRouter.route("/:id").put(updateOrderVM, checkOrder, editOrder);

ordersRouter.route("/details").get(getSeller, sellerHome);

export { ordersRouter };
