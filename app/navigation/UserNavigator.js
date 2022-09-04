import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useAuth from "../auth/useAuth";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import DashboardNavigator from "./DashboardNavigation";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  const { user, img, householdLinkID } = useAuth();

  const checkUserDetails = () => {
    if (Object.keys(img).length === 0) return "ProfilePictureScreen";
    if (householdLinkID) return "NewUserDashboardNavigator";
    // some reason doesn't work all the time
    if (!user?.households[0]) return "NewUserDashboardNavigator";
    return "DashboardNavigator";
  };

  return (
    <Stack.Navigator
      initialRouteName={checkUserDetails()}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ProfilePictureScreen"
        component={ProfilePictureScreen}
      />
      <Stack.Screen
        name="NewUserDashboardNavigator"
        component={NewUserDashboardNavigator}
      />
      <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} />
    </Stack.Navigator>
  );

  // return <>{checkUserDetails()}</>;
}
