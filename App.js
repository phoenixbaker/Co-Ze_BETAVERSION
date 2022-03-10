import React from "react";
import MapView from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import MessagesScreen from "./app/screens/MessagesScreen";
import LocationScreen from "./app/screens/LocationScreen";

export default function App(props) {
  return (
    // <NavigationContainer>
    //   <AuthNavigator />
    // </NavigationContainer>
    <LocationScreen />
  );
};