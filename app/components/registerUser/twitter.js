import { Alert, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import AppButton from "../AppButton";

import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, Platform } from "react-native";
import Colours from "../../config/Colours";

const useProxy = Platform.select({ web: false, default: true });

const discovery = {
  authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
  tokenEndpoint: "https://twitter.com/i/oauth2/token",
  revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
};

export default function twitter({ context }) {
  const { setRegisteredUser } = useContext(context);
  const [request, response, promtAsync] = useAuthRequest(
    {
      clientId: "dWt6SHZYWmJuVG9ZRTVZVlY1MEs6MTpjaQ",
      redirectUri: makeRedirectUri({
        scheme: "exp:///",
        useProxy,
      }),
      usePKCE: true,
      scopes: ["tweet.read"],
    },
    discovery
  );
  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <AppButton
      text="Twitter"
      //   onPress={() => promtAsync({ useProxy })}
      onPress={() => Alert.alert("coming soon")}
      icon="twitter"
      buttonStyle={{
        padding: 12,
        backgroundColor: "#1DA1F2",
      }}
      iconSize={32}
      iconStyle={{
        color: Colours.white,
      }}
    />
  );
}
