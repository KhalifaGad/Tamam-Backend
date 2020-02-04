import { categoriesModule } from '../db/modules/categories';

// query string lang = en or ar
async function getCategories(req, res, next) {
    let lang = req.query.lang || 'ar',

    { error, categories } = await categoriesModule.getCategories(lang)

    if(error) return next(boom.internal(err.errmsg))

    return res.status(200).send({
        isSuccessed: true,
        data: categories,
        error: null
    })
}

export { getCategories }
