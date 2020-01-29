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
        categoryId: req.body.categoryId,
        subcategory: req.body.subcategoryId,
        quantity: {
            val: req.body.quantityVal,
            measurement: req.body.quantityMeasurement
        },
        isTurkish: req.body.isTurkish,
    }
    let images = []
    req.files.forEach((file)=> {
        images.push('/product-images/' + file.filename)
    })
    product.images = images
    req.body = product
    next()
}

export { refactorAddProductReq }