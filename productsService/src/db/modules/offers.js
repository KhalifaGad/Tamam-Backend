import { OfferModel } from '../models/offerModel'

const offersModule = {
  async getOffers(limit = 0 , page = 0) {
    let offers = null, error = null
    try {
      let offers = await OfferModel.find({})
        .sort('startingDate')
        .select('-__v')
        .limit(limit)
        .skip(page)
        .populate('productId')
    } catch(err) {
      error = err
    }
    return {
      error,
    offers
  }
  }
}

export { offersModule }
