import { Router } from 'express'
import { addMessage } from '../../controllers/management'
import { addMessageVM } from '../../middlewares/validationHandler'

const managementRouter = Router()

//full endpoint: api/v1/countries
managementRouter.route('/message')
    .post(addMessageVM, addMessage)

export { managementRouter }