import { UserModel } from "../db/userModel"
import boom from '@hapi/boom'
import { checkPass } from '../utils/bcryptHelper'
import { generateToken } from "../utils/JWTHelper"
import { TokensModel } from '../db/tokensModel'

async function authenticate(req, res, next) {

    let {
        email,
        password,
        device
    } = req.body

    let user = await UserModel.findOne({ email })
    
    if (!user) {
        next(boom.notFound('wrong email or password'))
    }
 
    if (!await checkPass(password, user.password)) {
        next(boom.notFound('wrong email or password'))
    }

    if (!user.isVerified) {
        next(boom.forbidden('email is not verified'))
    }
    //tokenModel
    let token = generateToken(user._id, user.role)

    let tokensModel = new TokensModel({
        token,
        userId: user._id
    })

    tokensModel.save().catch(err => {
        console.log('saving token error, Error:' + err)
    })

    if(user.lastActiveDevice !== device) {
        user.lastActiveDevice = device
        user.save().catch(err => {
            console.log('updatig user last active device, Error:' + err)
        })
    }

    res.status(200).send({
        message: "ok",
        data: {
            user,
            token
        }
    })
}

// check for the old tokens too for the same user Id 
function decodeToken(req, res, next) {

}

export {
    authenticate,
    decodeToken
}
