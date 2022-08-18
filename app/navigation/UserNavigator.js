import { View, Text } from "react-native";
import React, { useEffect } from "react";

import useAuth from "../auth/useAuth";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";
import NewUserDashboardNavigator from "./NewUserDashboardNavigator";
import DashboardNavigator from "./DashboardNavigation";

export default function UserNavigator() {
  const { user, img } = useAuth();

  const checkUserDetails = () => {
    console.log();
    if (Object.keys(img).length === 0) return <ProfilePictureScreen />;
    // console.log("From checkUserDetails");
    // console.log(user);
    if (!user.households[0]) return <NewUserDashboardNavigator />;
    return <DashboardNavigator />;
  };

  return <>{checkUserDetails()}</>;
}
