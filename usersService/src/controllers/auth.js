import { UserModel } from "../db/userModel"
import boom from '@hapi/boom'
import { checkPass } from '../utils/bcryptHelper'
import { generateToken } from "../utils/JWTHelper"

async function authenticate(req, res, next) {

    let {
        email,
        password
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

    res.status(200).send({
        message: "ok",
        data: {
            user,
            token: generateToken(user._id, user.role)
        }
    })
}

function decodeToken(req, res, next) {

}

export {
    authenticate,
    decodeToken
}
