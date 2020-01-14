// This function is the error handler for the server,
// its invoked when next(err) called. 
function errorHandling(err, req, res, next){
    console.log(err)
    if(err.output.statusCode >= 500){
        console.log(err) // supposed to be in the error loging file
        res.status(err.output.statusCode).send({
            message: "Its not you, its us, we are working on fixing it :(",
            error: "Server Error"
        })
    }
    res.status(err.output.statusCode).send({
        message: err.output.payload.message,
        error: err.output.payload.error
    })
}

export { errorHandling }
