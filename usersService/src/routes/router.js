import express from 'express'
import { usersRouter } from './users'
import { authRouter } from './auth'
import { countriesRouter } from './countries'
import { managementRouter } from './management'

const router = express.Router()

// the full path is /api/v1/users
router.use('/users', usersRouter)

// the full path is /api/v1/auth
router.use('/auth', authRouter)

// the full path is /api/v1/countries
router.use('/countries', countriesRouter)

// the full path is /api/v1/management
router.use('/management', managementRouter)

router.use('/user-image', express.static('userImages'))

export { router }
