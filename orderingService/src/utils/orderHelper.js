async function prepareOrderArr(products, reqArray) {
  return reqArray.map(obj => {
    let product = products.filter(
      product => product._id + "" == obj.productId + ""
    )[0];
    
  });
}
