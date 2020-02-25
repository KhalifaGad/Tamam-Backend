import { UserModel } from '../userModel'

const userModule = {
    async getUser(id) {
        return await UserModel.findById(id)
    },
    async getUsersGroup(usersIds){
        return await UserModel.find({
            _id: {
                $in: usersIds
            }
        }).catch(err => {
            console.log(err)
            return []
        })
    }
}

export { userModule }
