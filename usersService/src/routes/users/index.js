import { Router } from 'express'
import { 
    addUser,
    getUsers,
    updateUser,
    getUser,
    deleteUser 
} from '../../controllers/users'
import { addUserValidation } from '../../middlewares/validationHandler'

const usersRouter = Router()

// api/v1/users
usersRouter.route('/')
    .post(addUserValidation, addUser)
    .get(getUsers)

usersRouter.route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser)

export { usersRouter }