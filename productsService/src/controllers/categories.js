import { CategoryModel } from "../db/categoryModel"

// query string lang = en or ar
async function getCategories(req, res, next) {
    let excludingQuery = {
        '__v': 0,
        'subcategories.nameEn': 0,
        'nameEn': 0
    },
        lang = req.query.lang || 'ar',
        overridenProp = 'nameAr'

    if (lang === 'en') {
        excludingQuery = {
            '__v': 0,
            'subcategories.nameAr': 0,
            'nameAr': 0
        }
        overridenProp = 'nameEn'
    }

    await CategoryModel.find({}, {
        ...excludingQuery
    }).lean().then(categories => {

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

        return res.status(200).send({
            isSuccessed: true,
            data: categories,
            error: null
        })
    }).catch(err => {
        return next(boom.internal(err.errmsg))
    })
}

export { getCategories }
