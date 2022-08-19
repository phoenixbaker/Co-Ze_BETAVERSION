import { View, Text } from "react-native";
import React from "react";
import AppButton from "../AppButton";
import Colours from "../../config/Colours";

export default function app({ onPress }) {
  return (
    <AppButton
      text="Or Sign-Up With Us"
      buttonStyle={{
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: Colours.primary,
      }}
      textStyle={{
        color: Colours.primary,
        fontWeight: "700",
      }}
      onPress={onPress}
    />
  );
}
