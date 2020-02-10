import { UserModel } from '../userModel'

const userModule = {
    async getUser(id){
        return await UserModel.findById(id)
    },
    async add2Fav(productId, user){
        user.favourites.push(productId)
        return await user.save()
    },
    async removeFromFav(productId, user){
        let productIdIndex = user.favourites.indexOf(productId)
        if(productIdIndex == -1) return user
        user.favourites.splice(productIdIndex, 1)
        return await user.save()
    }
}

export { userModule }
