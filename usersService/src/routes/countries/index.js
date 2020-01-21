import { Router } from 'express'
import {
    addCountry,
    getCountries,
    deleteCountry,
    updateCountry
} from '../../controllers/countries'
import { addCountryValidation } from '../../middlewares/validationHandler'

const countriesRouter = Router()

//full endpoint: api/v1/countries
countriesRouter.route('/')
    .post(addCountryValidation, addCountry)
    .get(getCountries)
    .delete(deleteCountry)
    .put(updateCountry)

export { countriesRouter }