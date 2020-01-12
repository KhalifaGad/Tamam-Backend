import productModel from '../db/productModel'

/**
 * Post "api/v1/products/product" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
// this function is missing autherization and authentication but for testing purposes
function addProduct(req, res, next) {
    // '/images/filename'
    console.log(JSON.stringify(req.body))
    
    /* let product = new productModel({
        name: {
            arabic: req.body.
        }
    }) */

    res.send('success :D ')
}

/**
 * Get "api/v1/products" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function getProducts(req, res, next) {

}

/**
 * Get "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function getProduct(req, res, next) {

}

/**
 * Delete "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function deleteProduct(req, res, next) {

}

/**
 * Put "api/v1/products/:id" handler function 
 * @param req: request param 
 * @param res: response param
 * @param next: express middleware function
 */
function updateProduct(req, res, next) {

}

export {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
