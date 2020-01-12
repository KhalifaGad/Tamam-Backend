function refactorAddProductReq(req, res, next) {
    let product = {
        name: {
            arabic: req.body.nameAr,
            english: req.body.nameEn
        },
        description: {
            arabic: req.body.descriptionAr,
            english: req.body.descriptionEn
        },
        price: req.body.price,
        category: {
            arabic: req.body.categoryAr,
            english: req.body.categoryEn
        },
        subcategory: {
            arabic: req.body.subcategoryAr,
            english: req.body.subcategoryEn
        },
        quantity: {
            val: req.body.quantityVal,
            measurment: req.body.quantityMeasurement
        },
        isTurkish: req.body.isTurkish,
    }
    let images = []
    req.files.forEach((file)=> {
        images.push('/images/' + file.filename)
    })
    product.images = images
    req.body = product
    next()
}

export { refactorAddProductReq }