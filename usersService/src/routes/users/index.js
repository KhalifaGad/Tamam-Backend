import { Router } from 'express'
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

const usersRouter = Router()

// api/v1/users
usersRouter.route('/')
    .post(addUserValidation, addUser)
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