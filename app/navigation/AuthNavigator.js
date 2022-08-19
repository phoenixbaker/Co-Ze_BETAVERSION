import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Colours from "../config/Colours";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardNavigation from "./DashboardNavigation";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import RegisterOptionsScreenNavigator from "./RegisterOptionsScreenNavigator";
import { ImageBackground } from "react-native";
import RegisterOptionsScreen from "../screens/RegisterOptionsScreen";
import RegisterDetailsScreen from "../screens/RegisterDetailsScreen";

const Stack = createNativeStackNavigator();

// STOP SWIPE ANIMATION TO PAGES

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colours.primary,
        },
        headerTitleStyle: {
          fontSize: 25,
        },
        headerTintColor: Colours.white,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterOptionsScreen} />
      <Stack.Screen
        name="RegisterDetailsScreen"
        component={RegisterDetailsScreen}
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
