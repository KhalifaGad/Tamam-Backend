// requiring dotenv package to use .env files
require('dotenv').config()

import { connectDB } from './src/db/dbConnection'
import { server } from './src/server'

connectDB(process.env.USERS_DB_URL).then(()=> {
    server.listen(process.env.USERS_N_PORT, ()=> {
        console.log('products service running on port: ' + process.env.PORT)
    })
}).catch((err)=> {
    console.log('Error: products service connection to database, ' + err)
})
/* "nodemon": "^2.0.2", */
