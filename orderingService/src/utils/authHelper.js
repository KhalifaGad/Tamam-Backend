import axios from "axios";

async function checkAuth(auth){
    let authResponse;
  
    try {
      authResponse = await axios
        .create({
          baseURL: "http://users-service:3002/api/v1",
          headers: {
            authentication: auth
          }
        })
        .get("/auth/user/cardinalities?inc=true");
    } catch (err) {
      return null
    }

    return authResponse
}

export { checkAuth }
