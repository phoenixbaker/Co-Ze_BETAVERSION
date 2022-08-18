import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import LocationScreen from "../screens/LocationScreen";
import EventsScreen from "../screens/EventsScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import FridgeScreen from "../screens/FridgeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddStoryScreen from "../screens/AddStoryScreen";

import { getUserDetails, postNotificationToken } from "../api/users";
import useAuth from "../auth/useAuth";
import DisplayStoryScreen from "../screens/DisplayStoryScreen";
import { checkHousholeUpdate } from "../api/household";

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  const { setHousehold, household, user, updateUserImage } = useAuth();

  useEffect(() => {
    registerForPushNotification();
  }, []);

  useEffect(() => {
    setInterval(async () => {
      const { data } = await checkHousholeUpdate(household);
      if (data === null) return;
      setHousehold(data);
    }, 5000);
  }, []);

  const registerForPushNotification = async () => {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (!permission.granted) return console.log("Nope");

    if (Platform.OS === "android")
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });

    const token = await Notifications.getExpoPushTokenAsync();
    if (token === user.notificationToken) return;
    return await postNotificationToken(token);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="Expenses"
        component={ExpensesScreen}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="displayStory"
        component={DisplayStoryScreen}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="uploadStory"
        component={AddStoryScreen}
        option={{ headerShown: false }}
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
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
