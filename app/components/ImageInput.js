import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colours from "../config/Colours";

export default function ImageInput() {
  return (
    <View>
      <Text>ImageInput</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.lightgray,
    borderRadius: 15,
    justifyContent: "center",
    height: 100,
    width: 100,
    alignItems: "center",
  },
});
