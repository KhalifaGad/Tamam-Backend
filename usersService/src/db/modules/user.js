import { UserModel } from '../userModel'

const userModule = {
    async getUser(id) {
        return await UserModel.findById(id)
    },
    /* async add2Fav(productId, _id) {
        UserModel.updateOne({ _id }, { $addToSet: { favourites: productId } })
        // user.favourites.push(productId)
        return await UserModel.findOneAndUpdate({ _id },
            { $addToSet: { favourites: productId } },
            { new: true })
    },
    async removeFromFav(productId, user) {
        let productIdIndex = user.favourites.indexOf(productId)
        if (productIdIndex == -1) return user
        user.favourites.splice(productIdIndex, 1)
        return await user.save()
    } */
}

export { userModule }
