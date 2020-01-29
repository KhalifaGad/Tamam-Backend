import { Router } from 'express'
import { categoriesRouter } from './categories'

let customerRouter = Router()

customerRouter.use('/categories', categoriesRouter)

export { customerRouter }