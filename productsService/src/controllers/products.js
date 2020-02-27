import boom from "@hapi/boom";

import { ProductModel } from "../db/models/productModel";
import { requestAuth } from "../utils/authRequest";
import { favoritesModule } from "../db/modules/favs";
import { cartModule } from "../db/modules/cart";

/**
 * Post "api/v1/products/product" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
// this function is missing autherization and authentication but for testing purposes,
// in the authorization we will get the seller data and put its id in the product,
// put for now I will set it 5e304d348ca5dd005fc89f12 as refrence to Khalifa Gad user
function addProduct(req, res, next) {
  let product = new ProductModel({
    ...req.body
  });

  product
    .save()
    .then(doc => {
      res.status(201).send({
        isSuccessed: true,
        data: doc,
        error: null
      });
    })
    .catch(err => {
      next(boom.internal(err));
    });
}

/**
 * Get "api/v1/products" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
// it accepts query strings: lang, skip, limit
// c = categoryId, s = subcategoryId,
// d = date ascending 'A' or descending 'D'
// CoI = country Id required
// n = productName
async function getProducts(req, res, next) {
  let favorites = [],
    cart = {
      products: []
    },
    auth = req.headers.authentication;

  if (auth) {
    let user = await requestAuth(auth);
    if (user) {
      favorites = await favoritesModule.getUserFavs(
        user._id,
        req.query.lang || "ar",
        "No"
      );
      if (favorites) {
        favorites = await favorites.map(id => id.toString());
      } else {
        favorites = [];
      }
      cart = await cartModule.getUserCart(
        user._id,
        req.query.lang || "ar",
        "No"
      );
      if (cart == null) {
        cart = {
          products: []
        };
      }
    }
  }

  let limit = parseInt(req.query.limit) || 0,
    skip = parseInt(req.query.skip) || 0,
    countryId = req.query.CoI || "5e3009b977a745002d1acbf7", // this will be changed to KSA CoI
    categoryId = req.query.c || null,
    subcategoryId = req.query.s || null,
    searchingQuery = {},
    dateSorting = req.query.d === "D" ? "-uploadDate" : "uploadDate",
    searchingName = req.query.n || null;

  searchingQuery.availableCountries = countryId;

  if (categoryId) {
    searchingQuery.categoryId = categoryId;
  }

  if (subcategoryId) {
    searchingQuery.subcategoryId = subcategoryId;
  }

  let retrevingLang = req.query.lang === "en" ? "english" : "arabic",
    categoryLang = req.query.lang === "en" ? "nameEn" : "nameAr";

  if (searchingName) {
    searchingQuery.$or = [
      {
        "name.english": new RegExp(searchingName, "i")
      },
      {
        "name.arabic": new RegExp(searchingName, "i")
      }
    ];
  }

  await ProductModel.find({
    $and: Object.keys(searchingQuery).map(key => {
      return { [key]: searchingQuery[key] };
    })
  })
    .limit(limit)
    .skip(skip)
    .select("-__v -quantityWarning")
    .sort(dateSorting)
    .populate("categoryId")
    .lean()
    .then(docs => {
      docs = docs.map(product => {
        try {
          product.isFav =
            favorites.indexOf(product._id.toString()) == -1 ? 0 : 1;
          let indexInCart = cart.products
            .map(elm => elm.product.toString())
            .indexOf(product._id.toString());
          product.cartQuantity =
            indexInCart >= 0 ? cart.products[indexInCart].quantity : 0;
          product.inCart = product.cartQuantity > 0 ? true : false;
          product.name = product.name[retrevingLang];
          product.description = product.description[retrevingLang];
          product.keyImage = product.images[0] || "";
          product.categoryName = product.categoryId[categoryLang];
          product.categoryId = product.categoryId._id;
          product.seller = "Tamam Platform";
          product.estimatedDeliveryTime = product.estimatedDeliveryTime || 2;
          return product;
        } catch (err) {
          console.log(err);
          return product;
        }
      });
      return res.status(200).send({
        isSuccessed: true,
        data: docs,
        error: null
      });
    })
    .catch(err => {
      next(boom.internal(err));
    });
}

/**
 * Get "api/v1/products/:id" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
// it accepts query strings: lang
async function getProduct(req, res, next) {
  let retrevingLang = req.query.lang === "en" ? "english" : "arabic",
    categoryLang = req.query.lang === "en" ? "nameEn" : "nameAr";

  await ProductModel.findById(req.params.id)
    .populate("offerId categoryId")
    .lean()
    .select("-quantityWarning")
    .then(product => {
      if (product) {
        product.name = product.name[retrevingLang];
        product.description = product.description[retrevingLang];
        product.estimatedDeliveryTime = product.estimatedDeliveryTime || 2;
        if(Object.keys(product.categoryId).length > 1){
          product.categoryName = product.categoryId[categoryLang];
          product.categoryId = product.categoryId._id;
        }
        product.seller = "Tamam Platform";
        return res.status(200).send({
          isSuccessed: true,
          data: product,
          error: null
        });
      }
      return next(boom.notFound("product not found"));
    })
    .catch(err => {
      return next(boom.internal(err));
    });
}

/**
 * Delete "api/v1/products/:id" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
function deleteProduct(req, res, next) {}

/**
 * Put "api/v1/products/:id" handler function
 * @param req: request param
 * @param res: response param
 * @param next: express middleware function
 */
async function updateProduct(req, res, next) {
  let productId = req.params.id;
  let product = await ProductModel.findById(productId).catch(err => {
    console.log(err);
    return null;
  });
  if (!product) return next(boom.notFound("Can not find product!"));
  let {
    nameAr = false,
    nameEn = false,
    descriptionAr = false,
    descriptionEn = false,
    categoryId = false,
    subcategoryId = false,
    price = false,
    quantityVal = false,
    quantityMeasurement = false,
    availableCountries = false,
    brandName = false,
    estimatedDeliveryTime = false,
    imgURL = false
  } = req.body;

  if (nameAr) product.name.arabic = nameAr;
  if (nameEn) product.name.english = nameEn;
  if (descriptionAr) product.description.arabic = descriptionAr;
  if (descriptionEn) product.description.english = descriptionEn;
  if (categoryId) product.categoryId = categoryId;
  if (subcategoryId) product.subcategoryId = subcategoryId;
  if (price) product.price = price;
  if (quantityVal) product.quantity.val = quantityVal;
  if (quantityMeasurement) product.quantity.measurement = quantityMeasurement;
  if (availableCountries) product.availableCountries = availableCountries;
  if (brandName) product.brandName = brandName;
  if (estimatedDeliveryTime)
    product.estimatedDeliveryTime = estimatedDeliveryTime;
  if (imgURL) product.images = product.images.filter(img => img != imgURL);

  product = await product
    .save()
    .lean()
    .catch(err => {
      console.log(err);
      return null;
    });

  if (!product) return next(boom.badRequest("Error saving data"));

  delete product.quantityWarning;

  return res.status(200).send({
    isSuccessed: true,
    data: product,
    error: null
  });
}

async function getProductsGroup(req, res, next) {
  let productsIds = req.query.productsIds;

  await ProductModel.find({
    _id: {
      $in: productsIds
    }
  })
    .populate({ path: "offerId" })
    .lean()
    .then(products => {
      products = products.map(product => {
        product.estimatedDeliveryTime = product.estimatedDeliveryTime || 2;
        return product;
      });
      return res.status(200).send({
        isSuccessed: true,
        data: products,
        error: null
      });
    })
    .catch(err => {
      console.log(err);
      return next(boom.internal(err));
    });
}

async function modifyProductsQuantity(req, res, next) {
  let productsQuantities = req.body.products;
  productsQuantities.map(async obj => {
    let product = await ProductModel.findById(obj.productId).catch(err => {
      console.log(err);
      return null;
    });
    if (!product) return;
    if (product.quantity.val < obj.quantity) {
      product.quantity.val -= 0;
      product.quantityWarning = true;
    } else {
      product.quantity.val -= obj.quantity;
      if (product.quantity.val < 6) {
        product.quantityWarning = true;
      }
    }
    await product.save();
  });
  res.send("ok");
}

async function getWarningsProducts(req, res, next) {
  let products = ProductModel.find({
    seller: req.body.user._id,
    quantityWarning: true
  });
}

export {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductsGroup,
  modifyProductsQuantity
};
