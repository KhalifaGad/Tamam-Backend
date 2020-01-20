// requiring dotenv package to use .env files
require('dotenv').config()

connectDB(process.env.PRODUCTS_DB_URL).then(()=> {
    server.listen(process.env.PORT, ()=> {
        console.log('products service running on port: ' + process.env.PORT)
    })
}).catch((err)=> {
    console.log('Error: products service connection to database, ' + err)
})
