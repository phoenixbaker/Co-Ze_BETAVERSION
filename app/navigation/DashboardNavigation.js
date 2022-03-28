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
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import AppText from "../config/AppText";
import useAuth from "../auth/useAuth";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Dashboard() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const DashboardNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Bottom"
        component={Dashboard}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
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
