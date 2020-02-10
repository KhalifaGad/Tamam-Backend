import express from 'express'
import {
    addUser,
    getUsers,
    updateUser,
    getUser,
    deleteUser,
    verifyUser,
    resendVerification,
    editUserFavs,
    getUserFavs
} from '../../controllers/users'
import {
    addUserValidation,
    verifyUserMiddleware,
    rsndVrfcMiddleware,
    idQueryParamVM
} from '../../middlewares/validationHandler'
import multer from 'multer'
import path from 'path'
import { isIdsEquivalent } from '../../middlewares/customerAuthorization'


const usersRouter = express.Router()

let storage = multer.diskStorage({
    destination: 'userImages/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +
            Date.now() +
            path.extname(file.originalname))
    }
}),
    upload = multer({
        storage
    })

// api/v1/users
usersRouter.route('/')
    .post(upload.single('userPic'), addUserValidation, addUser)
    .get(getUsers)

usersRouter.route('/:id')
    .post(idQueryParamVM, isIdsEquivalent, updateUser)
    .get(idQueryParamVM, getUser)
    .delete(idQueryParamVM, isIdsEquivalent, deleteUser)

// api/v1/users/:id/favorites
usersRouter.route('/:id/favorites')
    .post(idQueryParamVM, isIdsEquivalent, editUserFavs)
    .get(idQueryParamVM, isIdsEquivalent, getUserFavs)

usersRouter.route('/verification')
    .post(verifyUserMiddleware, verifyUser)

usersRouter.route('/verification/resend')
    .post(rsndVrfcMiddleware, resendVerification)

export { usersRouter }