import { Router } from 'express'
import screensRouter from './screens/index'
import { categoriesRouter } from './categories'

const managmentRouter = Router()

// api/v1/management/screens
managmentRouter.use('/screens', screensRouter)

managmentRouter.use('/categories', categoriesRouter)

export { managmentRouter as default }
