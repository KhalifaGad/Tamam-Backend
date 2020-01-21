import { Router } from 'express'
import { getHotDeals } from '../../controllers/homeService'

const router = Router()

//api/v1/home-service/hot-deals
router.route('/most-selling')
    .get(getHotDeals)

// latest uploaded products will be fetched from products routes

export { router as default }