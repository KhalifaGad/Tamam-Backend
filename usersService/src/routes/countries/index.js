import { Router } from 'express'
import { 
    addCountry, 
    getCountries, 
    deleteCountry, 
    updateCountry 
} from '../../controllers/countries'

const countriesRouter = Router()

countriesRouter.route('/countries')
.post(addCountry)
.get(getCountries)
.delete(deleteCountry)
.put(updateCountry)

export { countriesRouter }