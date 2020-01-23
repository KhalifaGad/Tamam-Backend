import mongoose from 'mongoose'

let tokensSchema = new mongoose.Schema({
    token: String,
    userId: mongoose.Schema.Types.ObjectId
})

let TokensModel = mongoose.model('Tokens', tokensSchema)

export { TokensModel }
