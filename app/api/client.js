import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.0.0.47:3000/api",
});

export default apiClient;
