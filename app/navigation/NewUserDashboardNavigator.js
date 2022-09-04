import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewUserDashboardScreen from "../screens/NewUserDashboardScreen";
import CreateHouseHoldNavigator from "./CreateHouseHoldNavigator";
import JoinHouseHoldScreen from "../screens/JoinHouseHoldScreen";
import useAuth from "../auth/useAuth";

const Stack = createNativeStackNavigator();

const NewUserDashboardNavigator = () => {
  const { householdLinkID } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        householdLinkID ? "JoinHouseHold" : "NewUserDashboardScreen"
      }
    >
      <Stack.Screen
        name="NewUserDashboardScreen"
        component={NewUserDashboardScreen}
      />
      <Stack.Screen name="JoinHouseHold" component={JoinHouseHoldScreen} />
      <Stack.Screen
        name="CreateHouseHold"
        component={CreateHouseHoldNavigator}
      />
    </Stack.Navigator>
  );
};

export default NewUserDashboardNavigator;
