import mongoose from 'mongoose'

let tokensSchema = new mongoose.Schema({
    token: String,
    userId: mongoose.Schema.Types.ObjectId,
    issueDate:{
        type: Date,
        default: new Date()
    } 
})

let TokensModel = mongoose.model('Tokens', tokensSchema)

export { TokensModel }
