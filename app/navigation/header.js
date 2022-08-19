import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../config/AppText";
import Colours from "../config/Colours";
export default function Header({ name }) {
  return (
    <View style={styles.header}>
      <AppText style={styles.headerText} autoCapitalize>
        {name}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colours.primary,
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
