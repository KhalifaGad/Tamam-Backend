import axios from 'axios'

async function checkCountry(req, res, next) {
    let code = req.body.countryCode

    let response = await axios
        .get(`http://users-service:3002/api/v1/countries?q=${code}`)
        .catch(err => {
            console.log(err)
        })
    console.log(response.data.data)
    next()

}

export { checkCountry }
