import * as SecureStore from "expo-secure-store";

const setImage = async (key, value) => {
  const store = JSON.stringify(value);
  try {
    await SecureStore.setItemAsync(key, store);
  } catch (e) {
    console.log("Error setting profile images", e);
  }
};

const getImages = async (key) => {
  const res = await SecureStore.getItemAsync(key);

  return JSON.parse(res);
};

const removeImage = async (key) => {
  return await SecureStore.deleteItemAsync(key);
};

const removeAllImages = async (household) => {
  household.users.forEach(async (user) => {
    return await SecureStore.deleteItemAsync(user._id);
  });
};

export default {
  setImage,
  getImages,
  removeImage,
  removeAllImages,
};
