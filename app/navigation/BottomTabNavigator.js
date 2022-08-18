import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreenNavigator from "./MessagesScreenNavigator";
import SettingsScreenNavigator from "./SettingsScreenNavigator";
import MessageUserScreen from "../screens/MessageUserScreen";

const Tabs = createBottomTabNavigator();

function BottomTabNavigator(props) {
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
        component={MessagesScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="settings-helper"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default BottomTabNavigator;
