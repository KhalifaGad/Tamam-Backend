import { Router } from 'express';
import multer from 'multer'

import {
  addProdcutVM,
  queryIdVM,
  getProductsVM,
  addOfferVM,
  getOffersVM,
  editFavsVM,
  editCartVM,
  aboveCustomerAuthorization,
  matchUserandIdParams
} from "../../middlewares/validationsHandler";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsGroup,
  modifyProductsQuantity,
  getWarningsProducts
} from "../../controllers/products";
import {
  getProductOffers,
  addOffer,
  editOffer,
  getOffers
} from "../../controllers/offers";
import { refactorAddProductReq } from "../../middlewares/reqRefactoingHelper";
import { uploadHelper } from "../../middlewares/multerHelper";
import { getUserFavs, editUserFavs } from "../../controllers/favs";
import { getUserFromAuth } from "../../middlewares/authHelper";
import { getUserCart, editUserCart } from "../../controllers/cart";

let upload = multer()

const productsRouter = Router()

// the full path is /api/v1/products
// get all products
productsRouter.route("/").get(getProductsVM, getProducts);

productsRouter
  .route("/warnings/seller/:id")
  .get(getUserFromAuth, matchUserandIdParams, getWarningsProducts);

productsRouter
  .route("/group")
  .get(getProductsGroup)
  .put(modifyProductsQuantity);

productsRouter.route('/favorites')
    .get(getUserFromAuth, getUserFavs)
    .put(upload.array(), editFavsVM, getUserFromAuth, editUserFavs)

productsRouter
  .route("/cart")
  .get(getUserFromAuth, getUserCart)
  .put(editCartVM, getUserFromAuth, editUserCart);

// the full path is /api/v1/products/product
// add new product
productsRouter
  .route("/product")
  .post(
    uploadHelper("productsImages/").array("photos", 6),
    addProdcutVM,
    aboveCustomerAuthorization,
    refactorAddProductReq,
    addProduct
  );

// the full path is /api/v1/products/offers
productsRouter.route("/offers").get(getOffersVM, getOffers);

// the full path is /api/v1/products/:id
productsRouter
  .route("/:id")
  .get(queryIdVM, getProduct) // get product by id
  .delete(deleteProduct) // delete product by id
  .put(updateProduct); // update product by id

// the full path is /api/v1/products/:id/offers
productsRouter
  .route("/:id/offers")
  .get(queryIdVM, getProductOffers)
  .post(uploadHelper("offersImages/").single("offerImg"), addOfferVM, addOffer);

// the full path is /api/v1/products/:id/offers/:id
productsRouter.route("/:productId/offers/:offerId").put(editOffer);

export { productsRouter };
