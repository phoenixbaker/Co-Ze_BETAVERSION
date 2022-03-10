import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginNavigator from "../navigation/LoginNavigator";
import RegisterScreenNavigator from "../navigation/RegisterNavigator";

const Stack = createNativeStackNavigator();

// STOP SWIPE ANIMATION TO PAGES

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginNavigator} />
    <Stack.Screen name="Register" component={RegisterScreenNavigator} />
  </Stack.Navigator>
);

export default AuthNavigator;
