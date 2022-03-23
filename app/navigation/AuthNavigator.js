import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardNavigation from "./DashboardNavigation";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";

const Stack = createNativeStackNavigator();

// STOP SWIPE ANIMATION TO PAGES

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DashboardNavigation} />
    <Stack.Screen
      name="NewUserDashboard"
      component={NewUserDashboardNavigator}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
