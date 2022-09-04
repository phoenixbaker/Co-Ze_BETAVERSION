import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";

import LocationScreen from "../screens/LocationScreen";
import EventsScreen from "../screens/EventsScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import FridgeScreen from "../screens/FridgeScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import AddStoryScreen from "../screens/AddStoryScreen";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";

import { getUserDetails, postNotificationToken } from "../api/users";
import useAuth from "../auth/useAuth";
import DisplayStoryScreen from "../screens/DisplayStoryScreen";
import { checkHousholeUpdate } from "../api/household";
import Subscription from "../screens/SubscriptionScreen";

const Stack = createNativeStackNavigator();

const DashboardNavigation = () => {
  const { setHousehold, household, user, updateUserImage } = useAuth();

  useEffect(() => {
    registerForPushNotification();
  }, []);

  useEffect(() => {
    async function getHouseholdInfo() {
      const { data } = await checkHousholeUpdate(household);
      if (data === null) return;
      return setHousehold(data);
    }
    getHouseholdInfo();
    const interval = setInterval(() => getHouseholdInfo(), 20000);
    return () => {
      clearInterval(interval);
    };
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
      <Stack.Screen name="Subscription" component={Subscription} />
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
      <Stack.Screen
        name="Profile_Picture"
        component={ProfilePictureScreen}
        option={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
