import { Router } from 'express'
import {
    addCountry,
    getCountries,
    deleteCountry,
    updateCountry
} from '../../controllers/countries'
import { addCountryValidation } from '../../middlewares/validationHandler'

const countriesRouter = Router()

countriesRouter.route('/')
    .post(/* addCountryValidation, */ addCountry)
    .get(getCountries)
    .delete(deleteCountry)
    .put(updateCountry)

export { countriesRouter }