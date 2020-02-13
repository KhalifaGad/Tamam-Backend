import { cartModule } from "../db/modules/cart"

async function getUserCart(req, res, next) {
    //cartModule
    const userId = req.body.user._id,
        lang = req.query.lang || 'ar'
    let cart = await cartModule.getUserCart(userId, lang),
        products = [],
        productsQuantity = 0,
        totalPrice = 0
    if (cart != null) {
        products = cart.products
        productsQuantity = products
            .map(obj => obj.quantity)
            .reduce((total, num) => total + num),
            totalPrice = products
                .map(obj => obj.product.price)
                .reduce((total, num) => total + num)
    }

    return res.status(200).send({
        isSuccessed: true,
        data: {
            cartProducts: products,
            cartInfo: {
                productsQuantity,
                totalPrice
            }
        },
        error: null
    })
}

async function editUserCart(req, res, next) {
    const userId = req.body.user._id,
        {
            productId,
            quantity
        } = req.body,
        lang = req.query.lang || 'ar'
    return res.status(200).send({
        isSuccessed: true,
        data: await cartModule.editCart(userId, productId, quantity, lang),
        error: null
    })
}

export {
    getUserCart,
    editUserCart
}
