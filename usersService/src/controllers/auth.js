import { UserModel } from "../db/userModel"
import boom from '@hapi/boom'
import { checkPass } from '../utils/bcryptHelper'
import { generateToken, decodeToken } from "../utils/JWTHelper"
import { TokensModel } from '../db/tokensModel'

async function authenticate(req, res, next) {

    let {
        email,
        password,
        device
    } = req.body

    let user = await UserModel.findOne({ email })

    if (!user) {
        return next(boom.badData('wrong email or password'))
    }

    if (!await checkPass(password, user.password)) {
        return next(boom.badData('wrong email or password'))
    }

    if (!user.isVerified) {
        return res.status(302).send({
            isSuccessed: true,
            data: {
                user,
                token: null
            },
            error: "User not verified!"
        })
    }
    //tokenModel
    let token = generateToken(user._id, user.role)

    await TokensModel({
        token,
        userId: user._id
    }).save().catch(err => {
        next(boom.internal(err))
    })

    if (user.lastActiveDevice !== device) {
        user.lastActiveDevice = device
        user.save().catch(err => {
            console.log('updatig user last active device, Error:' + err)
        })
    }

    return res.status(200).send({
        isSuccessed: true,
        data: {
            user: {
                userName: user.userName,
                favourites: user.favourites || [],
                points: user.points,
                isVerified: user.isVerified,
                _id: user._id,
                username: user.username,
                role: user.role,
                countryId: user.countryId,
                cityId: user.cityId,
                email: user.email,
                phone: user.phone,
                lastActiveDevice: user.lastActiveDevice,
                imgURL: user.imgURL
            },
            token
        },
        error: null
    })
}

// check for the old tokens too for the same user Id
async function getUserCardinalities(req, res, next) {
    let isUserIncluded = req.params.inc || false,
        user = null,
        docodingRes = decodeToken(req)

    if (!docodingRes.isAuthenticated) {
        return next(boom.unauthorized('Auth not included or malformed'))
    }

    let tokenModel = await TokensModel.findOne({
        userId: docodingRes.userId
    }).sort('-createdAt')

    if(!tokenModel) return res.status(404).send({
        isSuccessed: false,
            data: null,
            error: 'Previous processes required!'
    })

    if (tokenModel.token !== docodingRes.token) {
        return res.status(302).send({
            isSuccessed: false,
            data: {
                link: '/api/v1/auth',
                method: 'POST'
            },
            error: 'Re-login required!'
        })
    }

    if (isUserIncluded) {
        user = await UserModel.findById(docodingRes.userId)
    }

    return res.status(200).send({
        isSuccessed: true,
        data: {
            user,
            userId: docodingRes.userId,
            role: docodingRes.role
        },
        error: null
    })

}

export {
    authenticate,
    getUserCardinalities
}
