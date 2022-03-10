import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen"
import DashboardNavigation from './DashboardNavigation';

const Stack = createNativeStackNavigator();

const LoginScreenNavigator = () => (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen
            name="Login"
            component={LoginScreen}
        />
        <Stack.Screen
            name="Dashboard"
            component={DashboardNavigation}
        />
    </Stack.Navigator>
)

export default LoginScreenNavigator;