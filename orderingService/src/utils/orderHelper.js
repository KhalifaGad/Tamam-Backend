async function prepareOrderArr(products, reqArray) {
  return reqArray.map(obj => {
    let product = products.filter(
      product => product._id + "" == obj.productId + ""
    )[0];
    console.log(Object.keys(product.offerId));
    console.log(typeof product.offerId);
    /* if(Object.keys(product.offerId).length > 0){

    } */
  });
}

export { prepareOrderArr };
