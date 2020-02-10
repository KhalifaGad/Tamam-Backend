import { FavsModel } from "../models/favourites"

const favoritesModule = {
    async getUserFavs(userId, lang = 'ar') {
        const retrievedLang = lang == 'ar' ? 'arabic' : 'english'
        return await FavsModel.findOne({ userId })
            .populate('products')
            .lean()
            .then(async favs => {
                // console.log(favs)
                if(!favs){
                    return favs
                }
                await favs.products.map(product => {
                    product.name = product.name[retrievedLang]
                    product.description = product.description[retrievedLang]
                    product.keyImage = product.images[0]
                    
                    return product
                })
                return favs.products
            })
    },
    async addToFav(userId, productId) {
        return await FavsModel.findOneAndUpdate({ userId },
            { $addToSet: { products: productId } },
            { new: true, upsert: true })
    },
    async removeFromFav(userId, productId) {
        let favs = await FavsModel.findOne({userId})
        if(!favs){
            return null
        }
        let productIdIndex = favs.products.indexOf(productId)
        if (productIdIndex == -1) return favs
        favs.products.splice(productIdIndex, 1)
        return await favs.save()
    }
}

export { favoritesModule }
