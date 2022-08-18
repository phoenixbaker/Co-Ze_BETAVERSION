import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessagesScreen from "../screens/MessagesScreen";
import MessageUserScreen from "../screens/MessageUserScreen";

const Stack = createNativeStackNavigator();

export default function MessagesScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        option={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessageUser"
        component={MessageUserScreen}
        option={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
