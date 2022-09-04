import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";

import UserNavigator from "./UserNavigator";
import AuthNavigator from "./AuthNavigator";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage/token";
import userStorage from "../auth/storage/user";
import LoadingScreen from "../screens/LoadingScreen";
import { getUserDetails } from "../api/users";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");

export default function AppNavigator() {
  const { logIn, user, logOut } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix, "http://10.0.0.47:19000"],
    config: {
      screens: {
        AuthNavigator: {
          screens: {
            NewUserDashboard: {
              screens: {
                JoinHouseHold: {
                  path: "joinmyhousehold/:householdId",
                },
              },
            },
          },
        },
        UserNavigator: {
          screens: {
            DashboardNavigator: {
              screens: {
                Subscription: {
                  path: "subscription",
                },
                Events: {
                  path: "events",
                },
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (!initialURL) setData(Linking.parse(initialURL));
    }

    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }
    restoreUser();
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  const restoreUser = async () => {
    const authToken = await authStorage.getToken();
    if (!authToken) return setIsReady(true);

    // return logOut();

    const { data: user } = await getUserDetails();
    if (!user) return setIsReady(true);

    console.log("Restored authToken", authToken);
    console.log("Restored User", user);
    await logIn(user, authToken);
    console.log("is ready true");
    return setIsReady(true);
  };

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={!user ? "AuthNavigator" : "UserNavigator"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="UserNavigator" component={UserNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return <>{!user ? <AuthNavigator /> : <UserNavigator />}</>;
}
