import * as SecureStore from "expo-secure-store";

const key = "userDetails";
const key_2 = "profilePicture";

const setUser = async (value) => {
  console.log("HERE");
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log("Error setting user data", e);
  }
};

const getUser = async () => {
  const res = await SecureStore.getItemAsync(key);
  console.log(res, "GET USER:");
  return JSON.parse(res);
};

const setImages = async (value) => {
  try {
    await SecureStore.setItemAsync(key_2, value);
  } catch (e) {
    console.log("Error setting profile images", e);
  }
};

const getImages = async () => {
  console.log("Got images from userStorage");
  return await SecureStore.getItemAsync(key_2);
};

export default {
  setUser,
  getUser,
  setImages,
  getImages,
};
