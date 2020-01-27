// This function is the error handler for the server,
// its invoked when next(err) called. 
function errorHandling(err, req, res, next) {
    console.log(err)
    if (err.output.statusCode >= 500) {
        console.log(err) // supposed to be in the error loging file
        res.status(err.output.statusCode).send({
            isSuccessed: false,
            data: null,
            error: message: "Its not you, its us, we are working on fixing it :("
        })
    }
    res.status(err.output.statusCode).send({
        isSuccessed: false,
        data: null,
        error: err.output.payload.message
    })
}

export {
    errorHandling
}