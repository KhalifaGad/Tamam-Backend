import bcrypt from 'bcrypt'

function hashPass(password){
    return bcrypt.hash(password, 10)
}

export { hashPass }
