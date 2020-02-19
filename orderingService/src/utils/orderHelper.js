async function prepareOrder(products, reqArray, tax = 5) {
  let orderTotal = 0,
    preparedOrderArr = await reqArray.map(obj => {
      let product = products.filter(
        product => product._id + "" == obj.productId + ""
      )[0];
      obj.price = product.price;
      obj.total = product.price;
      if (product.offerId) {
        obj.offerId = product.offerId._id;
        obj.total = obj.price * (1 - product.offerId.discountRatio / 100);
      }
      orderTotal += obj.total;
      return obj;
    }),
    grandTotal = orderTotal * (1 + tax / 100);
  return {
    preparedOrderArr,
    orderTotal,
    grandTotal,
    tax
  }
}

export { prepareOrder };
