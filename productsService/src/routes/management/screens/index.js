import { Router } from 'express'
import homeScreenRouter from './home/index'

const screensRouter = Router()

// api/v1/management/screens/home
screensRouter.use('/home', homeScreenRouter)

export {
    screensRouter as default
}
