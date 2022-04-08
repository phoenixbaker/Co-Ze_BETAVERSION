import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LocationScreen from "../screens/LocationScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import FridgeScreen from "../screens/FridgeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile_Picture"
        component={ProfilePictureScreen}
        option={{ headerShown: true }}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        option={{ headerShown: true }}
      />
      <Stack.Screen
        name="Fridge"
        component={FridgeScreen}
        option={{ headerShown: true }}
      />
      <Stack.Screen
        name="Welcomescreen"
        component={WelcomeScreen}
        option={{ headerShown: true }}
      />
      <Stack.Screen
        name="NewUserDashboard"
        component={NewUserDashboardNavigator}
        option={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
