import { requestAuth } from "../utils/authRequest";
import boom from '@hapi/boom'

async function getUserFromAuth(req, res, next) {
    let auth = req.headers.authentication

    if (!auth) {
        next(boom.unauthorized("Authentication required!"))
    }
    let user = await requestAuth(auth)
    if (!user) {
        next(boom.unauthorized("Authentication required!"))
    }
    let body = {}
    if (!req.body) req.body = body
    req.body.user = user
    next()
}

export { getUserFromAuth }
