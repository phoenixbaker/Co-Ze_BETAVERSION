import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";

const setToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (e) {
    console.log("Error storing the AuthToken ", e);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.log("Error retrieving AuthToken", e);
  }
};

const getUserToken = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : undefined;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default {
  setToken,
  getToken,
  getUserToken,
  removeToken,
};
