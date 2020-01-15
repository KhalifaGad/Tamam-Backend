import { CountryModel } from '../db/countryModel'
import boom from '@hapi/boom'

function addCountry(req, res, next) {

    let country = new CountryModel({
        ...req.body
    })

    country.save().then(doc => {
        res.status(201).send({
            message: "created",
            data: doc
        })
    }).catch(err => {
        next(boom.internal(err))
    })
}

// it accepts query string lang
function getCountries(req, res, next) {
    let excludingQuery = {
        'nameAr': 0,
        'cities.nameAr': 0,
        "__v": 0
    }
    if (req.query.lang == 'Ar') {
        excludingQuery = {
            'nameEn': 0,
            'cities.nameEn': 0,
            "__v": 0
        }
    }

    CountryModel.find({}, {
        ...excludingQuery
    }).then(countries => {
        res.status(200).send({
            message: 'ok',
            data: countries
        })
    }).catch(err => {
        next(boom.internal(err))
    })

}

function updateCountry(req, res, next) {

}

function deleteCountry(req, res, next) {

}

export {
    addCountry,
    getCountries,
    updateCountry,
    deleteCountry
}
