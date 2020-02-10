import { favoritesModule } from "../db/modules/favs"

async function getUserFavs(req, res, next) {
    const userId = req.body.user._id,
        lang = req.query.lang || 'ar'
    
    return res.status(200).send({
        isSuccessed: true,
        data: await favoritesModule.getUserFavs(userId, lang),
        error: null
    })
}

async function editUserFavs(req, res, next) {
    let lang = req.query.lang || 'ar',
        {
            isNew,
            productId,
            user
        } = req.body
    isNew = isNew + ''
    isNew = isNew == 'false' ? false : true
    let favs = {}

    if (isNew) {
        favs = await favoritesModule.addToFav(user._id, productId)
    } else {
        favs = await favoritesModule.removeFromFav(user._id, productId)
    }

    res.status(201).send({
        isSuccessed: true,
        data: favs,
        error: null
    })
}

export { getUserFavs, editUserFavs }
