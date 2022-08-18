import * as SecureStore from "expo-secure-store";

const key = "userDetails";

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing user", error);
  }
};

const setUser = async (value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log("Error setting user data", e);
  }
};

const getUser = async () => {
  const res = await SecureStore.getItemAsync(key);
  return JSON.parse(res);
};

export default {
  setUser,
  getUser,
  removeUser,
};
