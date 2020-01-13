function productsRefactoring(products, lang) {

    let language = lang === 'en' ? 'english' : 'arabic'

    return products.map(product => {
        let refactoredProd = {}
        refactoredProd.name = product.name[language]
        refactoredProd.description = product.description[language]
        refactoredProd.category = product.category[language]
        refactoredProd.subcategory = product.subcategory[language]
        refactoredProd.productId = product._id
        refactoredProd.isTurkish = product.isTurkish
        refactoredProd.images = product.images
        refactoredProd.price = product.price
        refactoredProd.quantityVal = product.quantity.val
        refactoredProd.quantityMeasurement = product.quantity.measurement
        return refactoredProd
    })
}

function productRefactoring(product) {
    let language = lang === 'en' ? 'english' : 'arabic'
    let refactoredProd = {}
    refactoredProd.name = product.name[language]
    refactoredProd.description = product.description[language]
    refactoredProd.category = product.category[language]
    refactoredProd.subcategory = product.subcategory[language]
    refactoredProd.productId = product._id
    refactoredProd.isTurkish = product.isTurkish
    refactoredProd.images = product.images
    refactoredProd.price = product.price
    refactoredProd.quantityVal = product.quantity.val
    refactoredProd.quantityMeasurement = product.quantity.measurement
    return refactoredProd
}

export { productsRefactoring, productRefactoring }