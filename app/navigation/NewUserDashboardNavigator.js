import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LocationScreen from "../screens/LocationScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AppText from "../config/AppText";
import NewUserDashboardScreen from "../screens/NewUserDashboardScreen";
import CreateHouseHoldNavigator from "./CreateHouseHoldNavigator";

const Stack = createNativeStackNavigator();

const NewUserDashboardNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="NewUserDashboardScreen"
      component={NewUserDashboardScreen}
    />
    <Stack.Screen name="CreateHouseHold" component={CreateHouseHoldNavigator} />
  </Stack.Navigator>
);

export default NewUserDashboardNavigator;
