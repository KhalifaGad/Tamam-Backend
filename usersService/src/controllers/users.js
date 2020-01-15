import { gCC } from "../utils/getCountryCity"
import boom from '@hapi/boom'
import { checkPass } from "../utils/validatePassword"
import { UserModel } from "../db/userModel"
import { hashPass } from "../utils/hashPass"
import { mailer } from "../utils/sendVerification"
import phoneToken from 'generate-sms-verification-code'

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
    
    await user.save().then(doc => {
        mailer(fName, phoneToken(6, { type: 'number' }), email)     
        res.status(201).send({
            message: "created",
            data: doc
        })
    }).catch(err => {
        next(boom.notAcceptable(err.errmsg))
    })

    // save to verification models
}

function getUser(req, res, next) {

}

function getUsers(req, res, next) {

}

function updateUser(req, res, next) {

}

function deleteUser(req, res, next) {

}

export {
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}
