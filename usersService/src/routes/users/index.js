import express from 'express'
import {
    addUser,
    getUsers,
    updateUser,
    getUser,
    deleteUser,
    verifyUser,
    resendVerification
} from '../../controllers/users'
import {
    addUserValidation,
    verifyUserMiddleware,
    rsndVrfcMiddleware
} from '../../middlewares/validationHandler'
import multer from 'multer'
import path from 'path'


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
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser)

usersRouter.route('/verification')
    .post(verifyUserMiddleware, verifyUser)

usersRouter.route('/verification/resend')
    .post(rsndVrfcMiddleware, resendVerification)

export { usersRouter }