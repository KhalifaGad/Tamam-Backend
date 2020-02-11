import { cartModule } from "../db/modules/cart"

async function getUserCart(req, res, next) {
    //cartModule
    const userId = req.body.user._id,
        lang = req.query.lang || 'ar'

    return res.status(200).send({
        isSuccessed: true,
        data: await cartModule.getUserCart(userId, lang),
        error: null
    })
}

function editUserCart(req, res, next) {
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
