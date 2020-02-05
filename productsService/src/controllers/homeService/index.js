import { categoriesModule } from '../../db/modules/categories';
import { offersModule } from '../../db/modules/offers';
import { HomeSections } from '../../db/models/homeSectionsModel';
import boom from '@hapi/boom'
import axios from 'axios'

// query string: active true or false
async function getHomeSections(req, res, next) {
  let queryOp = {},
    homeSections,
    lang = req.query.lang || 'ar',
    langQuery = '&lang=' + lang,
    CoI = req.query.CoI,
    CoIQuery = '&CoI=' + CoI
    homeSeactionName = lang == 'en'? 'sectionNameEn' : 'sectionNameAr'
  if (req.query.active) {
    queryOp.active = req.query.active
  }

  try {
    homeSections = await HomeSections.find({
      ...queryOp
    })
  } catch (err) {
    return next(boom.internal(err))
  }
  // this variable will be removed on server
  let arbitraryLink = 
    'http://localhost:3001/api/v1/products?d=D&limit=5'
    + langQuery
    + CoIQuery

  let promisesArr = homeSections.map(homeSection => {
    return new Promise((resolve, reject) => {
      let link = homeSection.serverEndPointURL ?
        homeSection.serverEndPointURL + langQuery + CoIQuery : arbitraryLink
      resolve(axios.get(link))
    }).then(response => {
      return {
        name: homeSection[homeSeactionName],
        URL: homeSection.clientEndPointURL || arbitraryLink,
        data: response.data.data,
      }
    }).catch(err => {
      console.log(err)
    })
  })

  let categoriesPromise = new Promise((resolve, reject) => {
    resolve(categoriesModule.getCategories(lang))
  })
    .then(categories => {
      return {
        name: 'categories',
        data: categories.categories
      }
    })
    .catch(err => {
      console.log(err)
      return []
    })

  let offersPromise = new Promise((resolve, reject) => {
    resolve(offersModule.getOffers(5, 0, lang == 'en' ? 'english' : 'arabic'))
  })
    .then(offers => {
      return {
        name: 'offers',
        data: offers.offers
      }
    })
    .catch(err => {
      console.log(err)
      return []
    })

  promisesArr.push(...[offersPromise, categoriesPromise])

  let homeData = await Promise.all(promisesArr).then((values) => {
    return values
  }).catch(err => {
    //supposed to log in error file logging
    console.log(err)
    return []
  })
  let categoriesIndex = homeData.map(section => {
    return section.name
  }).indexOf('categories')

  let categories = homeData[categoriesIndex]
  homeData.splice(categoriesIndex, 1)
  
  let offersIndex = homeData.map(section => {
    return section.name
  }).indexOf('offers')

  let offers = homeData[offersIndex]
  homeData.splice(offersIndex, 1)
  
    //{ categories } = await categoriesModule.getCategories('en'),
    //{ offers } = await offersModule.getOffers(5, 0)

  return res.status(200).send({
    isSuccessed: true,
    data: {
      categories: categories.data,
      offers: offers.data,
      sections: homeData
    },
    error: null
  })

}

export { getHomeSections }
