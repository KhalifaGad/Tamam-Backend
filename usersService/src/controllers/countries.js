import { CountryModel } from '../db/countryModel'

function addCountry(req, res, next) {

    /* let {
        nameAr,
        nameEn,
        cities
    } = req.body */
    let test = {
        nameAr: "arabic country name1",
        nameEn: "english country name1",
        cities: [
            {
                nameAr: "arabic city name11",
                nameEn: "english city name11"
            },
            {
                nameAr: "arabic city name12",
                nameEn: "english city name12"
            },
            {
                nameAr: "arabic city name13",
                nameEn: "english city name13"
            }
        ]
    }

    let country = new CountryModel({
        /* ...req.body */
        ...test
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
