import { gCC } from "../utils/getCountryCity"
import boom from '@hapi/boom'
import { checkPass } from "../utils/validatePassword"
import { UserModel } from "../db/userModel"
import { hashPass } from "../utils/hashPass"
import { mailer } from "../utils/sendVerification"
import phoneToken from 'generate-sms-verification-code'
import { VerificationModel } from "../db/verificationModel"
import { generateToken } from "../utils/JWTHelper"

// api/v1/users
async function addUser(req, res, next) {
    let {
        fName,
        lName,
        countryCityIds,
        role,
        email,
        password
    } = req.body

    if (!checkPass(password)) {
        next(boom.notAcceptable('Not accepted password'))
    }

    if (!await gCC(countryCityIds.countryId, countryCityIds.cityId)) {
        next(boom.notFound('country-city not found!'))
    }

    let user = new UserModel({
        fName,
        lName,
        role,
        countryCityIds,
        email,
        password: await hashPass(password)
    })

    let verificationCode = phoneToken(6, { type: 'number' })

    let expDate = new Date()
    expDate.setDate(expDate.getDate() + 1)

    let doc = await user.save().catch(err => {
        next(boom.notAcceptable(err.errmsg))
    })

    res.status(201).send({
        message: "created",
        data: doc
    })

    // send email to user by verification code
    mailer(fName, verificationCode, email)

    // save verification of user
    let virificationModel = new VerificationModel({
        code: verificationCode,
        expDate,
        userId: doc._id,
    })

    virificationModel.save().catch(err=> {
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

function deleteUser(req, res, next) {

}

async function verifyUser(req, res, next){

    let {
        userId,
        code
    } = req.body

    let verification = await VerificationModel.findOne({
        userId,
        code
    }).catch(err => {
        next(boom.internal(err))
    })

    if(!verification){
        next(boom
            .notFound('verification not found for this cardinalities'))
    } 

    if(new Date() > verification.expDate){
        next(boom.notAcceptable(
            'Expiration date has been exceeded for this cardinalities'))
    }

    let user = await UserModel.findById(userId)

    user.isVerified = true
    let userRole = user.role

    await user.save()

    let token = generateToken(userId, userRole)

    res.status(200).send({
        message: "verified",
        data: {
            user,
            token
        }
    })

    VerificationModel.deleteOne({
        _id: verification._id
    }, (err)=> {
        // supposed to log in logging file
        console.log(err)
    })

}

async function resendVerification(req, res, next){
    let {
        userId,
        email
    } = req.body

    let verification = await VerificationModel.findOne({
        userId,
        email
    }).catch(err => {
        next(boom.internal(err))
    })

    if(!verification){
        next(boom
            .notFound('No previous verifications for this cardinalities'))
    }

    let code = phoneToken(6, { type: 'number' }),
        expDate = new Date()
        expDate.setDate(expDate.getDate() + 1)

    // send email to user by verification code
    mailer(fName, code, email)

    verification.code = code
    verification.expDate = expDate

    verification.save().then((doc => {
        res.status(200).send({
            message: "sent",
            data: {}
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
    resendVerification
}
