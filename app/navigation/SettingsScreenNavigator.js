import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfilePictureScreen from "../screens/ProfilePictureScreen";
import AccountScreen from "../screens/AccountScreen";

const Stack = createNativeStackNavigator();

export default function SettingsScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={AccountScreen} />

      <Stack.Screen
        name="Profile_Picture"
        component={ProfilePictureScreen}
        option={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
