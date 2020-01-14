import { Router } from 'express'
import { authenticate, decodeToken } from '../../controllers/auth'

const authRouter = Router()

usersRouter.route('/')
    .post(authenticate)

usersRouter.route('/decode')
    .post(decodeToken)

export { authRouter }