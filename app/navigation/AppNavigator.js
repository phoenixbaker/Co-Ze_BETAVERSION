import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

import UserNavigator from "./UserNavigator";
import AuthNavigator from "./AuthNavigator";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage/token";
import userStorage from "../auth/storage/user";
import LoadingScreen from "../screens/LoadingScreen";

export default function AppNavigator() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    restoreUser();
  }, []);

  const { logIn, user, logOut } = useAuth();

  const restoreUser = async () => {
    const authToken = await authStorage.getToken();
    if (!authToken) {
      return setIsReady(true);
    }

    // return logOut();

    const user = await userStorage.getUser();
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

  return <>{!user ? <AuthNavigator /> : <UserNavigator />}</>;
}
