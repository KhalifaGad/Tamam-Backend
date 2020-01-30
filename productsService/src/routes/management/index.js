import { Router } from 'express'
import screensRouter from './screens/index'
import { categoriesRouter } from './categories'

const managmentRouter = Router()

managmentRouter.use('/screens', screensRouter)

managmentRouter.use('/categories', categoriesRouter)

export { managmentRouter as default }
