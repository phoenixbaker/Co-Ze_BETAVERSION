import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardNavigation from "./DashboardNavigation";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator();

// STOP SWIPE ANIMATION TO PAGES

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DashboardNavigation} />
  </Stack.Navigator>
);

export default AuthNavigator;
