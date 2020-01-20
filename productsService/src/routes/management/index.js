import { Router } from 'express'
import screensRouter from './screens/index'

const managmentRouter = Router()

managmentRouter.use('/screens', screensRouter)

export { managmentRouter as default }
