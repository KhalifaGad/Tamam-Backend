import { Router } from 'express'
import homeScreenRouter from './home/index'

const screensRouter = Router()

screensRouter.use('/home', homeScreenRouter)

export {
    screensRouter as default
}