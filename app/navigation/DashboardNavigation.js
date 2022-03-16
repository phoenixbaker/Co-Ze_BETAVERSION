import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LocationScreen from '../screens/LocationScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Dashboard() {
    return(
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="Dashboard" component={DashboardScreen} />
    <Tabs.Screen name="Account" component={AccountScreen} />
    <Tabs.Screen name="Messages" component={MessagesScreen} />
  </Tabs.Navigator>
    );
}

const DashboardNavigation = () => (
    <Stack.Navigator
    >
        <Stack.Screen 
            name = "Bottom"
            component={ Dashboard }
            option={{headerShown:false}}
        />
        <Stack.Screen 
            name = "Location"
            component={ LocationScreen }
            option = {{headerShown: true}}
        />

    </Stack.Navigator>
)

export default DashboardNavigation;