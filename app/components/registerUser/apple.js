import { View, Text, Alert } from "react-native";
import React, { useContext } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { postUser } from "../../api/users";

export default function apple({ context }) {
  const { registeredUser, setRegisteredUser } = useContext(context);
  const handleRegister = async () => {
    const res = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // returns null if used once - so if null user is in swystum
    // email res.email
    // fullName - res.fullName.givenName + res.fullName.middleName (maybe null) res.fullName.familyName
    // appleAuthCode - res.authorizationCode
    // appleIdToken - res.identityToken
    // appleUser - res.user
    setRegisteredUser({
      data: {
        name: res.fullName.givenName + res.fullName.familyName,
        email: res.email,
      },
      from: {
        provider: "Apple",
        AuthCode: res.authorizationCode,
        IdToken: res.identityToken,
      },
      verified: true,
    });
  };

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={50}
      style={{
        width: "100%",
        height: 55,
        marginVertical: 10,
      }}
      onPress={async () => await handleRegister()}
    />
  );
}
