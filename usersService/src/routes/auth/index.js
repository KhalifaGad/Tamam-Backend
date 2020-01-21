import { Router } from 'express'
import { authenticate, decodeToken } from '../../controllers/auth'
import { loginValidation } from '../../middlewares/validationHandler'

const authRouter = Router()

// api/v1/auth
authRouter.route('/')
    .post(loginValidation ,authenticate)

authRouter.route('/decode')
    .post(decodeToken)

export { authRouter }