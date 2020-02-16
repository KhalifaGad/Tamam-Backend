import { CartModel } from "../models/cart"

const cartModule = {
    async getUserCart(userId, lang = 'ar', populatedProp = 'products.product') {
        const retrievedLang = lang == 'en' ? 'english' : 'arabic',
            categoryLang = lang === "en"
                ? 'nameEn'
                : 'nameAr',
            categoryPop = populatedProp == 'products.product' ?
                'categoryId' : ''
        return await CartModel.findOne({
            userId
        }).lean()
            .populate({
                path: populatedProp,
                populate: {
                    path: categoryPop
                }
            })
            .then(async cart => {
                if (!cart) {
                    return cart
                }
                if (cart.products == []) {
                    return cart
                }
                await cart.products.map(productObj => {
                    try {
                        productObj.product.name =
                            productObj.product.name[retrievedLang]
                        productObj.product.description =
                            productObj.product.description[retrievedLang]
                        if (Object.keys(productObj.product.categoryId).length > 1) {
                            productObj.product.categoryName =
                                productObj.product.categoryId[categoryLang]
                            productObj.product.categoryId =
                                productObj.product.categoryId._id
                        }
                    } catch (err) {
                        // there will be error when products not populated XD
                    }

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
        let productIndex = userCart.products.map(productCartObj =>
            productCartObj.product.toString()).indexOf(productId.toString())

        if (productIndex < 0) {
            userCart.products.push({ product: productId, quantity })
            return await this.saveIt(userCart, retrievedLang)
        }

        userCart.products[productIndex] = { product: productId, quantity }
        return await this.saveIt(userCart, retrievedLang)
    },
    async addUserCart(userId, products, retrievedLang) {
        return await CartModel({
            userId,
            products
        }).save()
            .then(async userCart => {
                return await CartModel.populate(userCart,
                    { path: 'products.product', options: { lean: true } })
                    .then(async userCart => {
                        return await this.adjustCartObjLang(userCart,
                            retrievedLang)
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
        return await userCart.products.map(cartObj => {
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
                        return await this.adjustCartObjLang(userCart,
                            retrievedLang)
                    })
                    .catch(err => {
                        console.log(err)
                        return null
                    })
            })
    }
}

export { cartModule }
