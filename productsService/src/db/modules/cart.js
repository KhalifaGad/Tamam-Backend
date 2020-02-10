import { CartModel } from "../models/cart"

const cartModule = {
    async getUserCart(userId, lang = 'ar') {
        const retrievedLang = lang == 'ar' ? 'arabic' : 'english'
        return await CartModel.findOne({
            userId
        }).populate('product').then(cart => {
            cart.prodcuts.map(productObj => {
                productObj.product.name = 
                    productObj.product.name[retrievedLang]
                productObj.product.description = 
                    productObj.product.description[retrievedLang]

                return productObj
            })
        })
    }
}

export { cartModule }
