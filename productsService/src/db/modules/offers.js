import { OfferModel } from '../models/offerModel'

const offersModule = {
  async getOffers(limit = 0, page = 0, lang = 'arabic') {
    let offers = null, error = null
    try {
      let queryOp = {}
      queryOp.expirationDate = {
        '$gte': new Date()
      }
      offers = await OfferModel.find({
        ...queryOp
      })
        .sort('startingDate')
        .select('-__v')
        .limit(limit)
        .skip(page)
        .populate('productId')
        .lean()

      offers = offers.map(offer => {
        offer.product = offer.productId
        delete offer.productId

        offer.product.name = offer.product.name[lang]
        offer.product.description = offer.product.description[lang]
        return offer
      })
    } catch (err) {
      error = err
    }
    return {
      error,
      offers
    }
  }
}

export { offersModule }
