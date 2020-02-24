import axios from "axios";

async function getProductsGroup(productsIds, auth = '') {
  let productRes = null,
    queryStrings = "";

  for (let id of productsIds) {
    queryStrings += `productsIds[]=${id}&`;
  }

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
