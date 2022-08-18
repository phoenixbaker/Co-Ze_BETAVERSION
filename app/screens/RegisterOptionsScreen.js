import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Facebook from "expo-facebook";
import AppButton from "../components/AppButton";
// import * as facebookAuth from 'expo-auth-session/providers/facebook'
// import * as WebBrowser from 'expo-web-browser'

// WebBrowser.maybeCompleteAuthSession();

const faceBookID = "321336776685083";

export default function RegisterOptionsScreen() {
  const faceBookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: faceBookID,
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        let response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        // const user_id = await response.json().id;

        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View>
      <AppButton text="FaceBook" onPress={() => faceBookLogIn()} />
    </View>
  );
}

const styles = StyleSheet.create({});
