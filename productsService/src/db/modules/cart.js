import { CartModel } from "../models/cart"

const cartModule = {
    async getUserCart(userId, lang = 'ar') {
        const retrievedLang = lang == 'ar' ? 'arabic' : 'english'
        return await CartModel.findOne({
            userId
        }).lean()
            .populate('products')
            .then(async cart => {
                if (!cart) {
                    return cart
                }
                if (cart.prodcuts == []) {
                    return cart
                }
                await cart.prodcuts.map(productObj => {
                    productObj.product.name =
                        productObj.product.name[retrievedLang]
                    productObj.product.description =
                        productObj.product.description[retrievedLang]

                    return productObj
                })
                return cart
            })
    },
    async editCart(userId, productId, quantity, lang = 'ar') {
        const retrievedLang = lang == 'ar' ? 'arabic' : 'english',
            query = { userId }
        let userCart = {}
        try {
            userCart = await CartModel.findOne(query)
        } catch (err) {
            return null
        }
        if (!userCart) {
            return await this.addUserCart(userId,
                [{ product: productId, quantity }], retrievedLang)
        }

        let productIndex = userCart.prodcuts.map(productCartObj =>
            productCartObj.product.toString()).indexOf(productId.toString)

        if (productIndex < 0) {
            userCart.prodcuts.push({ product: productId, quantity })
            return await this.saveIt(userCart, retrievedLang)
        }

        userCart.prodcuts[productIndex] = { product: productId, quantity }
        return await this.saveIt(userCart, retrievedLang)
    },
    async addUserCart(userId, prodcuts, retrievedLang) {
        return await CartModel({
            userId,
            prodcuts
        }).save()
            .then(async userCart => {
                return await CartModel.populate(userCart,
                    { path: 'products.product', options: { lean: true } })
                    .then(async userCart => {
                        return await this.adjustCartObjLang(userCart, retrievedLang)
                    })
                    .catch(err => {
                        console.log(err)
                        return null
                    })
            }).catch(err => {
                console.log(err)
                return null
            })
    },
    async adjustCartObjLang(userCart, retrievedLang) {
        return await userCart.prodcuts.map(cartObj => {
            try {
                cartObj.product.name =
                    cartObj.product.name[retrievedLang]
                cartObj.product.description =
                    cartObj.product.description[retrievedLang]
            } catch (err) {
                console.log(err)
            }

            return cartObj
        })
    },
    async saveIt(userCart, retrievedLang) {
        return await userCart.save()
            .then(async userCart => {
                return await CartModel.populate(userCart,
                    { path: 'products.product', options: { lean: true } })
                    .then(async userCart => {
                        return await this.adjustCartObjLang(userCart, retrievedLang)
                    })
                    .catch(err => {
                        console.log(err)
                        return null
                    })
            })
    }
}

export { cartModule }
