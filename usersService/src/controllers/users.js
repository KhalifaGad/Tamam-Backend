import { gCC } from "../utils/getCountryCity"
import boom from '@hapi/boom'
import { checkPass } from "../utils/validatePassword"
import { UserModel } from "../db/userModel"
import { hashPass } from "../utils/bcryptHelper"
import { mailer } from "../utils/sendVerification"
import { VerificationModel } from "../db/verificationModel"
import { generateToken } from "../utils/JWTHelper"
import { TokensModel } from "../db/tokensModel"
import { getPhoneToken } from '../utils/phoneTokenHelper.js'
import { userModule } from "../db/modules/user"
// api/v1/users
async function addUser(req, res, next) {
    let {
        userName,
        countryId,
        cityId,
        role,
        email,
        password,
        phone,
        device
    } = req.body,
        imgURL = ''

    if (req.file) {
        imgURL = 'http://144.91.100.164:3002/api/v1/user-image/'
            + req.file.filename
    }

    if (!checkPass(password)) {
        return next(boom.notAcceptable('Password must contain capital letter,'
            + ' number and more than 7 letters '))
    }

    if (!await gCC(countryId, cityId)) {
        return next(boom.notFound('country-city not found!'))
    }

    let user = new UserModel({
        userName,
        role,
        countryId,
        cityId,
        email,
        phone,
        lastActiveDevice: device,
        password: await hashPass(password),
        imgURL
    })

    let verificationCode = getPhoneToken(6)

    let expDate = new Date()
    expDate.setDate(expDate.getDate() + 1)

    let doc = await user.save().catch(err => {
        return next(boom.notAcceptable(err.errmsg))
    })

    res.status(201).send({
        isSuccessed: true,
        data: {
            user: {
                userName: doc.userName,
                /* favourites: doc.favourites || [], */
                points: doc.points,
                isVerified: doc.isVerified,
                _id: doc._id,
                username: doc.username,
                role: doc.role,
                countryId: doc.countryId,
                cityId: doc.cityId,
                email: doc.email,
                phone: doc.phone,
                lastActiveDevice: device,
                imgURL: doc.imgURL
            },
            token: null
        },
        error: null
    })

    // send email to user by verification code
    mailer(userName, verificationCode, email)

    // save verification of user
    let virificationModel = new VerificationModel({
        code: verificationCode,
        expDate,
        userId: doc._id,
        email
    })

    virificationModel.save().catch(err => {
        // supposed to log err in err logging file
        console.log(err)
    })

}

function getUser(req, res, next) {

}

function getUsers(req, res, next) {

}

function updateUser(req, res, next) {

}

/* async function editUserFavs(req, res, next) {
    const { id } = req.params
    
    let {
        isNew,
        productId
    } = req.body

    isNew = isNew == 'false'? false : true
    
    let user = await userModule.getUser(id) 
    
    if (isNew) {
        user = await userModule.add2Fav(productId, user)
    } else {
        user = await userModule.removeFromFav(productId, user)
    }

    res.status(201).send({
        isSuccessed: true,
        data: user,
        error: null
    })
}

async function getUserFavs(req, res, next){
    const { id } = req.params
    let user = await userModule.getUser(id)
    if(!user) return next(boom.notFound("User not found"))
    
    res.status(200).send({
        isSuccessed: true,
        data: user.favourites,
        error: null
    })
} */

function deleteUser(req, res, next) {

}

// done
async function verifyUser(req, res, next) {
    //5e202b8021d8e050e28e6b53
    let {
        userId,
        code,
        device
    } = req.body

    let verification = await VerificationModel.findOne({
        userId,
        code
    }).catch(err => {
        next(boom.internal(err))
    })

    if (!verification) {
        return next(boom
            .notFound('verification not found for this cardinalities'))
    }

    if (new Date() > verification.expDate) {
        return next(boom.notAcceptable(
            'Expiration date has been exceeded for this cardinalities'))
    }

    let user = await UserModel.findById(userId)

    user.isVerified = true
    user.lastActiveDevice = device
    let userRole = user.role

    await user.save()

    let token = generateToken(userId, userRole)

    let tokensModel = new TokensModel({
        token,
        userId: user._id
    })

    tokensModel.save().catch(err => {
        console.log('Error saving user token in tokens model')
    })

    res.status(200).send({
        isSuccessed: true,
        data: {
            user,
            token
        },
        error: null
    })

    VerificationModel.deleteOne({
        _id: verification._id
    }, (err) => {
        // supposed to log in logging file
        console.log(err)
    })

}

// done
async function resendVerification(req, res, next) {
    let {
        userId
    } = req.body

    let verification = await VerificationModel.findOne({
        userId
    }).catch(err => {
        next(boom.internal(err))
    })

    if (!verification) {
        return next(boom
            .notFound('No previous verifications for this cardinalities'))
    }

    let code = getPhoneToken(6),
        expDate = new Date()

    expDate.setDate(expDate.getDate() + 1)
    // send email to user by verification code
    let email = verification.email
    mailer(email.split("@")[0], code, email)

    verification.code = code
    verification.expDate = expDate

    verification.save().then((doc => {
        res.status(200).send({
            isSuccessed: true,
            data: {},
            error: null
        })
    })).catch(err => {
        // supposed to log in error logging file
        console.log(err)
    })


}

export {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    verifyUser,
    resendVerification,
    editUserFavs,
    getUserFavs
}
