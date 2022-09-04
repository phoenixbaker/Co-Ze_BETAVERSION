import * as Facebook from "expo-facebook";
import React, { useContext, useEffect } from "react";

import Colours from "../../config/Colours";
import AppButton from "../AppButton";

const faceBookID = "321336776685083";

export default function facebookRegister({ context }) {
  const { registeredUser, setRegisteredUser } = useContext(context);
  const handleRegister = async () => {
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
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
        );
        // const user_id = await response.json().id;
        const data = await response.json();
        setRegisteredUser({
          data,
          from: {
            provider: "Facebook",
            authToken: token,
            id: data.id,
          },
          verified: true,
        });
        // Navigate to password
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <AppButton
      text="FaceBook"
      textStyle={{
        fontWeight: "600",
      }}
      onPress={async () => await handleRegister()}
      icon="facebook"
      iconSize={35}
      iconStyle={{
        color: Colours.white,
      }}
      buttonStyle={{
        padding: 10,
        backgroundColor: "#4267B2",
      }}
    />
  );
}
