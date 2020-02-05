import { Router } from 'express'
import { usersRouter } from './users'
import { authRouter } from './auth'
import { countriesRouter } from './countries'

const router = Router()

router.use('/images', express.static('userImages'))
// the full path is /api/v1/users
router.use('/users', usersRouter)

// the full path is /api/v1/auth
router.use('/auth', authRouter)

// the full path is /api/v1/countries
router.use('/countries', countriesRouter)

export { router }
