import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterOptionsScreen from "../screens/RegisterOptionsScreen";

const Stack = createNativeStackNavigator();

export default function RegisterOptionsScreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterOptions" component={RegisterOptionsScreen} />
    </Stack.Navigator>
  );
}
