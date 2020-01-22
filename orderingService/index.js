// requiring dotenv package to use .env files
require('dotenv').config()

import { connectDB } from './src/db/dbConnection'
import { server } from './src/server'

connectDB(process.env.ORDERING_DB_URL).then(()=> {
    server.listen(process.env.ORDERING_N_PORT, ()=> {
        console.log('ordering service running on port: ' + process.env.PORT)
    })
}).catch((err)=> {
    console.log('Error: ordering service connection to database, ' + err)
})
