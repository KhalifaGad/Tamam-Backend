import axios from 'axios'

async function getCountry(code){
    let response = await axios
        .get(`http://users-service:3002/api/v1/countries?q=${code}&lang=en`)
        .catch(err => {
            console.log(err)
            return null
        })
    if(!response) return null

    return response.data.data[0]
}

export { getCountry }
