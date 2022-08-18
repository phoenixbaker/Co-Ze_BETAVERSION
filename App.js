import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";

import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";

// Expenses dynamic bar

// Calender for Upcoming Events

// Add middleware or smnthn to check if image has changed so server doesn't overload on req

// Subscription

// Drop down menu for households, ability to add new users and change to different household

const prefix = Linking.createURL("/");

export default function App(props) {
  const [user, setUser] = useState();
  const [household, setHousehold] = useState();
  const [img, setImg] = useState({});
  const [stories, setStories] = useState({});

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        household,
        setHousehold,
        img,
        setImg,
        stories,
        setStories,
      }}
    >
      {/* Make Loading... screen */}
      {/* Make Offline */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
