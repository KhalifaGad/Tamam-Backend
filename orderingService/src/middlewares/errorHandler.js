// This function is the error handler for the server,
// its invoked when next(err) called. 
function errorHandling(err, req, res, next){
    console.log(err)
    if(err.output.statusCode >= 500){
        console.log(err) // supposed to be in the error loging file
        return res.status(err.output.statusCode).send({
            isSuccessed: false,
            error: "Its not you, its us, we are working on fixing it :(",
            data: null
        })
    }
    return res.status(err.output.statusCode).send({
        isSuccessed: false,
        error: err.output.payload.message,
        data: null
    })
}

export { errorHandling }
