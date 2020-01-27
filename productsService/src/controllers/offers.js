import {
    ProductModel
} from '../db/productModel'
import boom from '@hapi/boom'
import {
    OfferModel
} from '../db/offerModel'

function getProductOffers(req, res, next) {
    let {
        id
    } = req.params
    OfferModel.find({
        productId: id
    }).then(offers => {
        res.status(200).send({
            isSuccessed: true,
            data: offers,
            error: null
        })
    }).catch(err => {
        next(boom.internal(err))
    })
}

async function addOffer(req, res, next) {

    let {
        id
    } = req.params, {
        discountRatio,
        expirationDate,
        startingDate
    } = req.body

    if (!startingDate) startingDate = new Date()

    let product = await ProductModel.findById(id)

    if (!product) next(boom.notFound('There are no product for this id'))

    let offer = new OfferModel({
        productId: id,
        discountRatio,
        price: product.price,
        expirationDate,
        startingDate
    })

    offer.save().then(offer => {
        res.status(201).send({
            isSuccessed: true,
            data: offer,
            error: null
        })
    }).catch(err => {
        next(boom.internal(err))
    })

}

function editOffer(req, res, next) {

}

//page, limit
function getOffers(req, res, next) {

}

export {
    getProductOffers,
    addOffer,
    editOffer,
    getOffers
}