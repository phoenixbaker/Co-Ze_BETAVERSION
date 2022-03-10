import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../screens/RegisterScreen";
import DashboardNavigation from "./DashboardNavigation";

const Stack = createNativeStackNavigator();

const RegisterScreenNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DashboardNavigation} />
  </Stack.Navigator>
);

export default RegisterScreenNavigator;
