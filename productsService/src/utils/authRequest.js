import axios from 'axios'

async function requestAuth(auth){
    let authResponse = await axios.create({
        baseURL: 'http://users-service:3002/api/v1',
        headers: {
            authentication: auth
        }
    }).get('/auth/user/cardinalities?inc=true').catch(err => {
        //console.log(err)
        return {
            isInternalError: true
        }
    })

    if(authResponse.isInternalError){
        return null
    }

    if(!authResponse.data.isSuccessed){
        return null
    }
    return authResponse.data.data.user
}

export { requestAuth }
