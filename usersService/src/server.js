import express from 'express'
import { notFoundFallback } from './controllers/index'
import { errorHandling } from './middlewares/errorHandler'
import { router }  from './routes/router'
import multer from 'multer'


let server = express(),
    upload = multer()


// for application/x-www-form-urlencoded requests
server.use(express.urlencoded({ extended: true }))

// for application/json requests
server.use(express.json())

server.use(upload.array())

// Our api version 1 routes
server.use('/api/v1', router)

// route not found fallback 
server.all('*', notFoundFallback)

// Error handler middleware.
server.use(errorHandling)

export { server }
