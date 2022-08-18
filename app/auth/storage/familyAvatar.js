import * as SecureStore from "expo-secure-store";

const setFamilyImage = async (value, user_id) => {
  const store = JSON.stringify(value);
  try {
    await SecureStore.setItemAsync(user_id, store);
  } catch (e) {
    console.log("Error setting profile image for family");
  }
};

const getFamilyImage = async (user_id) => {
  const res = await SecureStore.getItemAsync(user_id);

  return JSON.parse(res);
};

const removeFamilyImage = async (user_id) => {
  return await SecureStore.deleteItemAsync(user_id);
};

export default {
  setFamilyImage,
  getFamilyImage,
  removeFamilyImage,
};
