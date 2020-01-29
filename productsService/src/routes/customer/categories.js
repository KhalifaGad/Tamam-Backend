import { Router } from 'express'
import { getCategories } from '../../controllers/categories'

let categoriesRouter = Router()

categoriesRouter.route('/')
    .get(getCategories)

export { categoriesRouter }