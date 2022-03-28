import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateHouseHoldScreen from "../screens/CreateHouseHoldScreen";
import DashboardNavigation from "./DashboardNavigation";

const Stack = createNativeStackNavigator();

const CreateHouseHoldNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="CreateHouseHoldScreen"
      component={CreateHouseHoldScreen}
    />
    <Stack.Screen name="Dashboard" component={DashboardNavigation} />
  </Stack.Navigator>
);

export default CreateHouseHoldNavigator;
