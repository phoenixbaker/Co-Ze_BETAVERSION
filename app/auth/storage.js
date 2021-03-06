import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

// Re-watch mosh video

const key = "authToken";
const user = "userDetails";

const setUser = async (value) => {
  try {
    await SecureStore.setItemAsync(user, value);
  } catch (error) {
    console.log("Error setting user data ", error);
  }
};

const getUser = async () => {
  return await SecureStore.getItemAsync(user);
};

const setToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUserToken = async () => {
  const token = await getToken();
  // return null;
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default {
  getUser: getUserToken,
  removeToken,
  setToken,
  getToken,
  setUser,
  getUser,
};
