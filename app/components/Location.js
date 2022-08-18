import * as Location from "expo-location";

import { updateLocation } from "../api/location";

async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return console.warn("No location permissions");

  let { coords } = await Location.getCurrentPositionAsync({});
  const res = await updateLocation(coords);
  return res;
}

export { getUserLocation };
