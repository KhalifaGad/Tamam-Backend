import boom from '@hapi/boom'
import { decodeToken } from '../utils/JWTHelper'

// this function ensure that id from query param equal to id from auth token
async function isIdsEquivalent(req, res, next) {
    const { id } = req.params
    let decodingRes = await decodeToken(req)
    if (!decodingRes.isAuthenticated) {
        next(boom.unauthorized("Authentication required!"))
    }
    if (id !== decodingRes.userId) {
        next(boom.unauthorized("oh uh, you are not allowed for this action!"))
    }
    next()
}

export { isIdsEquivalent }
