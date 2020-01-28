import { Router } from 'express'
import { authenticate, getUserCardinalities } from '../../controllers/auth'
import { loginValidation } from '../../middlewares/validationHandler'

const authRouter = Router()

// api/v1/auth
authRouter.route('/')
    .post(loginValidation ,authenticate)

authRouter.route('/user/cardinalities')
    .get(getUserCardinalities)

export { authRouter }