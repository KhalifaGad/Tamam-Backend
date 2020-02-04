import { CategoryModel } from '../models/categoryModel';

const categoriesModule = {
  async getCategories(lang){
    let excludingQuery = {
        '__v': 0,
        'subcategories.nameEn': 0,
        'nameEn': 0
    },
        overridenProp = 'nameAr',
        categories = null,
        error = null

    if (lang.toLowerCase() === 'en') {
        excludingQuery = {
            '__v': 0,
            'subcategories.nameAr': 0,
            'nameAr': 0
        }
        overridenProp = 'nameEn'
    }

    try {
      categories = await CategoryModel.find({}, {
          ...excludingQuery
      }).lean()

      categories.map(category => {
          category.name = category[overridenProp]
          delete category[overridenProp]

          category.subcategories.map(subcategory => {
              subcategory.name = subcategory[overridenProp]
              delete subcategory[overridenProp]

              return subcategory
          })

          category.imgUrl = category.imgUrl || ""
          return category
      })
      return {
        error,
        categories
      }
    } catch(err) {
      return {
        error: err,
        categories
      }
    }
  }
}

export { categoriesModule }
