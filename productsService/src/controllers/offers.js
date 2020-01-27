import {
    ProductModel
} from '../db/productModel'
import boom from '@hapi/boom'
import {
    OfferModel
} from '../db/offerModel'

// the full path is /api/v1/products/:id/offers
// it accepts 'exp' true or false as query string, default false
function getProductOffers(req, res, next) {
    let {
        id
    } = req.params,
        exp = req.query.exp || false,
        queryOp = {
            productId: id
        }

    // if exp is true, authorization must be required
    if (!exp) {
        queryOp.expirationDate = {
            "$gte": new Date()
        }
    }

    OfferModel.find({
        ...queryOp
    }).then(offers => {

        let data = 
            exp === "true"? 
                offers : offers[0] || null
        
        res.status(200).send({
            isSuccessed: true,
            data,
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

//it accepts query string: page, limit
// the full path is /api/v1/products/offers
async function getOffers(req, res, next) {
    let limit = parseInt( req.query.limit) || 0,
        page = parseInt(req.query.page) || 0

    await OfferModel.find({})
        .sort('startingDate')
        .select('-__v')
        .limit(limit)
        .skip(page)
        .populate('productId')
        .then(offers => {
            console.log(offers[2])
            return res.status(200).send({
                isSuccessed: true,
                data: offers,
                error: null
            })
        }).catch(err => {
            next(boom.internal(err))
        })
}

export {
    getProductOffers,
    addOffer,
    editOffer,
    getOffers
}