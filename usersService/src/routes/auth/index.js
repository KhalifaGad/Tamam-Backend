import { Router } from 'express'
import { authenticate, decodeToken } from '../../controllers/auth'

const authRouter = Router()

authRouter.route('/')
    .post(authenticate)

authRouter.route('/decode')
    .post(decodeToken)

export { authRouter }