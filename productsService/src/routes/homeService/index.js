import {
    Router
} from 'express'
import {
    getMostSold
} from '../../controllers/homeService'

const router = Router()

//api/v1/home-service/most-sold
router.route('/most-sold')
    .get(getMostSold)

// new products will be fetched from products route

//api/v1/home-service/new-products
router.route('/most-sold')
    .get(getMostSold)

router.route('/offers')
    .get(getMostSold)

// latest uploaded products will be fetched from products routes

export {
    router as
    default
}