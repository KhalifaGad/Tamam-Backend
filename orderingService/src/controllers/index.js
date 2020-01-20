import boom from '@hapi/boom'

function notFoundFallback(req, res, next){
    next(boom.notFound('Route not found!'))
}

export { notFoundFallback }
