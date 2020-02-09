import axios from 'axios'

async function requestAuth(auth){
    let authResponse = await axios.create({
        baseURL: 'http://users-service:3002/api/v1',
        headers: {
            authentication: auth
        }
    }).get('/auth/user/cardinalities').catch(err => {
        return {
            isInternalError: true
        }
    })

    if(authResponse.isInternalError){
        return null
    }

    console.log(authResponse.data)
    return authResponse.data
}

export { requestAuth }
