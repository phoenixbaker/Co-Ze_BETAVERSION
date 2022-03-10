import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardNavigation = () => (
    <>
    <Tabs.Navigator
        screenOptions={{ headerShown: false}}
    >
        <Tabs.Screen
            name="Dashboard"
            component={DashboardScreen}
        />
        <Tabs.Screen
            name="Account"
            component={AccountScreen}
        />
        <Tabs.Screen
            name="Messages"
            component={AccountScreen}
        />

    </Tabs.Navigator>
    </>
)

export default DashboardNavigation;