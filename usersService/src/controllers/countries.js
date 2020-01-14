import { CountryModel } from '../db/countryModel'

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

function getCountries(req, res, next) {

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
