import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import DashboardNavigation from "./app/navigation/DashboardNavigation";
import NewUserDashboardNavigator from "./app/navigation/NewUserDashboardNavigator";
import authStorage from "./app/auth/storage";

export default function App(props) {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  const newUser = () => {
    if (JSON.stringify(user.households).length == 2)
      return <NewUserDashboardNavigator />;
    return <DashboardNavigation />;
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? newUser() : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
