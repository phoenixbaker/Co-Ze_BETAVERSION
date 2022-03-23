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
import CreateHouseHoldScreen from "../screens/CreateHouseHoldScreen";

const Stack = createNativeStackNavigator();

// const Tabs = createBottomTabNavigator();

// function Dashboard() {
//   return (
//     <Tabs.Navigator screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="Dashboard"
//         component={DashboardScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Messages"
//         component={MessagesScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="message" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Account"
//         component={AccountScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tabs.Navigator>
//   );
// }

const NewUserDashboardNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen
      name="Bottom"
      component={Dashboard}
      option={{ headerShown: false }}
    /> */}

    <Stack.Screen
      name="NewUserDashboardScreen"
      component={NewUserDashboardScreen}
    />
    <Stack.Screen name="CreateHouseHold" component={CreateHouseHoldScreen} />
  </Stack.Navigator>
);

export default NewUserDashboardNavigator;
