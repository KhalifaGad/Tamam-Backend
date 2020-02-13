import axios from 'axios'
import boom from '@hapi/boom'

async function checkCountry(req, res, next) {
    let code = req.body.countryCode

    let response = await axios
        .get(`http://users-service:3002/api/v1/countries?q=${code}&lang=en`)
        .catch(err => {
            console.log(err)
        })
    let country = response.data.data[0]
    if (country == undefined)
        return next(boom.badData('Tamam is not in this country, yet!'))

    if (!country.isBlocked)
        return next(boom.badData('This country is blocked!'))

    req.body.countryName = country.name
    next()
}

export { checkCountry }
