import { Router } from 'express'
import { 
    addUser,
    getUsers,
    updateUser,
    getUser,
    deleteUser 
} from '../../controllers/users'

const usersRouter = Router()

usersRouter.route('/')
    .post(addUser)
    .get(getUsers)

usersRouter.route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser)

export { usersRouter }