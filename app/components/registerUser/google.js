import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "../AppButton";
import * as Google from "expo-auth-session/providers/google";
import Colours from "../../config/Colours";

WebBrowser.maybeCompleteAuthSession();

export default function google({ context }) {
  const [accessToken, setAccessToken] = useState();
  const { setRegisteredUser } = useContext(context);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "353751055063-7ri3rmf8ontiul1dm4kqh1cn338p7lkf.apps.googleusercontent.com",
  });

  useEffect(() => {
    getUserData(response);
  }, [response]);

  const getUserData = async () => {
    if (response?.type !== "success") return console.log("here");

    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${response.authentication.accessToken}`,
        },
      }
    );

    const data = await userInfoResponse.json();
    setRegisteredUser({
      data,
      from: "Gmail",
      verified: true,
    });
  };

  const registerUser = async () => {
    await promptAsync({ showInRecents: true });
  };

  return (
    <AppButton
      text="GMAIL"
      textStyle={{
        fontWeight: "600",
      }}
      onPress={async () => await registerUser()}
      buttonStyle={{ backgroundColor: "#08851b", padding: 12 }}
      icon="email"
      iconSize={30}
      iconStyle={{
        color: Colours.white,
      }}
    />
  );
}
