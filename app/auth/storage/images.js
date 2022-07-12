import * as SecureStore from "expo-secure-store";

const key = "profileImage";

const setImages = async (value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log("Error setting profile images", e);
  }
};

const getImages = async () => {
  return await SecureStore.getItemAsync(key);
};

export default {
  setImages,
  getImages,
};
