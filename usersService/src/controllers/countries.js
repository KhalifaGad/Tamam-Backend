import { CountryModel } from '../db/countryModel'
import boom from '@hapi/boom'

function addCountry(req, res, next) {

    let country = new CountryModel({
        ...req.body
    })

    country.save().then(doc => {
        res.status(201).send({
            isSuccessed: true,
            data: doc,
            error: null
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
        "__v": 0,
        'isBlocked': 0,
    },
        overridenProp = 'nameEn'
    if (req.query.lang == 'Ar') {
        excludingQuery = {
            'isBlocked': 0,
            'nameEn': 0,
            'cities.nameEn': 0,
            "__v": 0
        },
            overridenProp = 'nameAr'
    }


    CountryModel.find({}, {
        ...excludingQuery
    }).lean().then(async countries => {

        countries.map(country => {
            country.name = country[overridenProp]
            delete country[overridenProp]

            country.cities.map(city => {
                city.name = city[overridenProp]
                delete city[overridenProp]
                return city
            })

            country.flagImage = country.flagImage || ""

            return country
        })
        res.status(200).send({
            isSuccessed: true,
            data: countries,
            error: null
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
