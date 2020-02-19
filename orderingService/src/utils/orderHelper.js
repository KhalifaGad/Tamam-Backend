async function prepareOrder(products, reqArray) {
  let productsBySeller = grouptBySeller(products);
  let orders = [];

  for (let seller in productsBySeller) {
    let orderTotal = 0,
      tax = 5, // supposed to be retrieved from DB
      estimatedTime = 0;

    orders.push({
      preparedOrderArr: reqArray.filter(obj => {
        try {
          let product = productsBySeller[seller].filter(
            product => product._id + "" == obj.productId + ""
          )[0];
          obj.price = product.price;
          obj.total = product.price;
          if (product.estimatedDeliveryTime > estimatedTime) {
            estimatedTime = product.estimatedDeliveryTime;
          }
          if (product.offerId) {
            obj.offerId = product.offerId._id;
            obj.total = obj.price * (1 - product.offerId.discountRatio / 100);
          }
          orderTotal += obj.total;
          return obj;
        } catch (err) {
          console.log(err);
          return false;
        }
      }),
      orderTotal,
      tax,
      estimatedTime,
      grandTotal: orderTotal * (1 + tax / 100)
    });
  }
  return orders
}

function grouptBySeller(products) {
  let sellersProducts = {};
  for (let i = 0; i < products.length; i++) {
    if (sellersProducts[products[i].seller] == undefined) {
      sellersProducts[products[i].seller] = [products[i]];
    } else {
      sellersProducts[products[i].seller].push(products[i]);
    }
  }
  return sellersProducts;
}

export { prepareOrder };
