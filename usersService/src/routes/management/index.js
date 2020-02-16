import { Router } from 'express'
import { addMessage, getMessages } from '../../controllers/management'
import { addMessageVM } from '../../middlewares/validationHandler'

const managementRouter = Router()

//full endpoint: api/v1/countries
managementRouter.route('/messages')
    .post(addMessageVM, addMessage)
    .get(getMessages) // autherization required

export { managementRouter }