// This function is the error handler for the server,
// its invoked when next(err) called. 
function errorHandling(err, req, res, next){
    res.send(err)
}

export { errorHandling }
