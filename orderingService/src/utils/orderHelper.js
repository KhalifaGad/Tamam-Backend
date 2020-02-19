async function prepareOrderArr(products, reqArray) {
  return reqArray.map(obj => {
    let product = products.filter(
      product => product._id + "" == obj.productId + ""
    )[0];
    obj.price = product.price;
    obj.total = product.price;
    if (product.offerId) {
      obj.offerId = product.offerId._id;
      obj.total = obj.price * (1 - product.offerId.discountRatio / 100);
    }
    return obj
  });
}

export { prepareOrderArr };
