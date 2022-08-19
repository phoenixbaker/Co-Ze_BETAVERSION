import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./header";
import Colours from "../config/Colours";

import RegisterDetailsScreen from "../screens/RegisterDetailsScreen";
import RegisterOptionsScreen from "../screens/RegisterOptionsScreen";

const Stack = createNativeStackNavigator();

export default function RegisterOptionsScreenNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="RegisterOptions"
        component={RegisterOptionsScreen}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="RegisterDetailsScreen"
        component={RegisterDetailsScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
}
