import axios from "axios";

async function getProductsGroup(productsIds, auth = "") {
  let productRes = [],
    products = null,
    queryStrings = "";

  for (let id of productsIds) {
    queryStrings += `productsIds[]=${id}&`;
    if (queryStrings.length >= 1900) {
      // to make sure that get query length do not exceed 2024 length
      products = await requestProducts(queryStrings, auth);
      if (products) productRes.push(...products);
      queryStrings = "";
    }
  }

  if (queryStrings != "") {
    products = await requestProducts(queryStrings, auth);
    if (products) productRes.push(...products);
  }

  return productRes.length > 0 ? productRes : null;
}

async function requestProducts(queryStrings, auth) {
  let productRes = null;

  try {
    productRes = await axios
      .create({
        baseURL: "http://products-service:3001/api/v1",
        headers: {
          authentication: auth
        }
      })
      .get("/products/group?" + queryStrings);
  } catch (err) {
    console.log(err);
    return null;
  }
  if (productRes) return productRes.data.data;
  return productRes;
}

async function modifyProductsGroup(products) {
  let successfullySent = true;
  try {
    await axios
      .create({
        baseURL: "http://products-service:3001/api/v1"
        /* headers: {
          authentication: auth
        } */
      })
      .put("/products/group", { products });
  } catch (err) {
    console.log(err);
    successfullySent = false;
  }

  return successfullySent;
}

export { getProductsGroup, modifyProductsGroup };
