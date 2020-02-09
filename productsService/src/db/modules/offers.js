import { OfferModel } from '../models/offerModel'

const offersModule = {
  async getOffers(limit = 0, page = 0, lang = 'arabic', countryId) {
    let offers = null, error = null
    try {
      let queryOp = {}
      queryOp.expirationDate = {
        '$gte': new Date()
      }
      queryOp.availableCountries = countryId
      offers = await OfferModel.find({
        ...queryOp
      })
        .sort('startingDate')
        .limit(limit)
        .skip(page)
        /* .populate('productId')
        .populate('categoryId') */
        .populate({
          path: 'productId',
          populate: {
            path: 'categoryId'
          }
        })
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
  },
  async addOffer(
    offerImgURL,
    productId,
    discountRatio,
    price,
    expirationDate,
    startingDate,
    availableCountries
  ) {

    let offer = null

    try {
      offer = await new OfferModel({
        offerImgURL,
        productId,
        discountRatio,
        price,
        expirationDate,
        startingDate,
        availableCountries
      }).save()
    } catch (err) {
      return {
        offer,
        err
      }
    }
    return {
      offer,
      err: null
    }
  }
}

export { offersModule }
