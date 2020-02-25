import { Router } from "express";
import {
  makeOrder,
  getUserOrders,
  editOrder,
  getSellerOrders
} from "../../controllers/orders";
import {
  makeOrderVM,
  mongooseIdReqParamVM,
  getAddressVM,
  addAddressVM,
  toggleMainAddressVM,
  updateOrderVM,
  idAndAuthCheck,
  getSellerOrderVM
} from "../../middlewares/validationHandler";
import {
  getUserAddresses,
  addAddress,
  getAdress,
  toggleMainAddress
} from "../../controllers/addresses";
import { checkCountry } from "../../middlewares/countryHandler";
import { sellerHome } from "../../controllers/sellerHome";
import { getSeller, getCustomer } from "../../middlewares/authenticator";
import { checkOrder } from "../../middlewares/orderHelper";

const ordersRouter = Router();

ordersRouter.route("/user/:id").get(mongooseIdReqParamVM, getUserOrders);

ordersRouter
  .route("/seller/:id")
  .get(getSeller, idAndAuthCheck, getSellerOrderVM, getSellerOrders);

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

ordersRouter.route("/").post(makeOrderVM, getCustomer, makeOrder);
ordersRouter.route("/:id").put(updateOrderVM, getSeller, checkOrder, editOrder);

ordersRouter.route("/details").get(getSeller, sellerHome);

export { ordersRouter };
