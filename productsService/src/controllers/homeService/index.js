import { categoriesModule } from '../../db/modules/categories';
import { offersModule } from '../../db/modules/offers';

function getHomeSections(req, res, next) {

  // categories essential, get categories endpoint (done)
  //categoriesModule.getCategories(lang = 'en')
  // sections []
  // offers essential, get offers end point (done) /api/v1/products/offers
  //offersModule.getOffers(4, 0)

}

export { getHomeSections }
