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
        subcategoryId: req.body.subcategoryId,
        quantity: {
            val: req.body.quantityVal,
            measurement: req.body.quantityMeasurement
        },
        brandName: req.body.brandName,
        availableCountries: req.body.availableCountries
    }
    let images = []
    req.files.forEach((file)=> {
        images.push('http://144.91.100.164:3001/api/v1/product-images/' 
        + file.filename)
    })
    product.images = images
    req.body = product
    next()
}

export { refactorAddProductReq }