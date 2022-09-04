import * as Location from "expo-location";

import { updateLocation } from "../api/location";

async function getUserLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return console.warn("No location permissions");
  // const { status: backgroundStatus } =
  //   await Location.requestBackgroundPermissionsAsync();
  // console.log(backgroundStatus);
  let { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.LocationAccuracy.BestForNavigation,
    distanceInterval: 20,
  });
  const res = await updateLocation(coords);
  return res;
}

export { getUserLocation };
