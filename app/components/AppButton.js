import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colours from "../config/Colours";

function AppButton({
  buttonStyle,
  icon,
  iconStyle,
  iconColor,
  iconSize = 20,
  text,
  textStyle,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.defaultButton, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.defaultText, textStyle]}>{text}</Text>

      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize}
          style={[styles.defaultIcon, iconStyle]}
          color={[Colours.mediumgray, iconColor]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: Colours.primary,
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row-reverse",
    justifyContent: "center",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 25,
  },
  defaultIcon: {
    marginRight: 10,
  },
  defaultText: {
    color: Colours.white,
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default AppButton;
