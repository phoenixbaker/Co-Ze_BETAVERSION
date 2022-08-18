import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardNavigation from "./DashboardNavigation";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import RegisterOptionsScreenNavigator from "./RegisterOptionsScreenNavigator";

const Stack = createNativeStackNavigator();

// STOP SWIPE ANIMATION TO PAGES

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterOptionsScreenNavigator}
      />
      <Stack.Screen
        name="NewUserDashboard"
        component={NewUserDashboardNavigator}
      />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
      />
      <Stack.Screen name="Dashboard" component={DashboardNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
