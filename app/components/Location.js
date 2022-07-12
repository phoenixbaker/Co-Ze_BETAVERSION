import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import { updateLocation } from "../api/location";
import useAuth from "../auth/useAuth";

export default async function getLocation() {
  let { user, setUser } = useAuth();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  let { coords } = await Location.getCurrentPositionAsync({});
  setLocation(coords);
  const result = await updateLocation(
    coords.latitude,
    coords.longitude,
    user._id
  );
  // console.log(coords);
  return coords;
  // console.log("user");

  // console.log(user);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
