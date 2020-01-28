import jwt from 'jsonwebtoken'

function generateToken(userId, role) {
    return jwt.sign({
        userId,
        role
    }, process.env.TOKEN_SECRET)
}

function decodeToken(req) {
    let auth = req.headers.authentication

    if (!auth) {
        return {
            isAuthenticated: false,
            role: null,
            userId: null,
            token: null
        }
    }

    let token = auth.replace('Bearer ', '')

    let decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    return {
        isAuthenticated: true,
        role: decoded.role,
        userId: decoded.userId,
        token
    }



}

export {
    generateToken,
    decodeToken
}
