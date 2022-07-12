import { create } from "apisauce";
import authStorage from "../auth/storage/token";

// const apiClient = create({
//   baseURL: "http://10.0.0.47:5000/api",
// });

const apiClient = create({
  baseURL: "http://123.208.183.180:5000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
