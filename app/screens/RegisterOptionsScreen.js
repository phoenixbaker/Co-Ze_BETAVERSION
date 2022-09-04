import { Alert, StyleSheet, Text, View, Platform } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";

import {
  FacebookRegister,
  GoogleRegister,
  AppleRegister,
  TwitterRegister,
  AppRegister,
} from "../components/registerUser";
import AppButton from "../components/AppButton";

import * as WebBrowser from "expo-web-browser";
import Colours from "../config/Colours";

WebBrowser.maybeCompleteAuthSession();

const registerUser = createContext();

export default function RegisterOptionsScreen({ navigation }) {
  const [registeredUser, setRegisteredUser] = useState({
    data: null,
    verified: false,
  });

  useEffect(() => {
    setRegisteredUser({
      data: null,
      verified: false,
    });
  }, []);

  useEffect(() => {
    // Facebook
    // email, FB_id, name, FB_IDToken

    // Gmail
    // email, Gmail_id, name, Gmail_IDToken

    // Apple
    // email, Apple_ID, name, Apple_IDToken

    if (registeredUser.data === null) return;
    return navigation.navigate("RegisterDetailsScreen", {
      registeredUser: registeredUser,
    });
  }, [registeredUser]);

  return (
    <View
      style={{
        backgroundColor: Colours.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <registerUser.Provider value={{ registeredUser, setRegisteredUser }}>
        <View style={{ width: "93%" }}>
          <FacebookRegister context={registerUser} />
          <TwitterRegister context={registerUser} />
          <GoogleRegister context={registerUser} />
          {Platform.OS === "ios" && <AppleRegister context={registerUser} />}
          <View>
            <AppRegister
              onPress={() =>
                navigation.navigate("RegisterDetailsScreen", {
                  registeredUser: registeredUser,
                })
              }
            />
          </View>
        </View>
      </registerUser.Provider>
    </View>
  );
}

const styles = StyleSheet.create({});
