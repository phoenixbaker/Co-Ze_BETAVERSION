import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

import Screen from "../components/Screen";
import AppText from "../config/AppText";

function NewUserDashboardScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.buttonContainer}>
        <AppButton
          text="Join A Household"
          onPress={() => console.log("Go to JoinHouseHoldScreen")}
        />
        <AppButton
          text="Make A New Household"
          onPress={() => navigation.navigate("CreateHouseHold")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "85%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewUserDashboardScreen;
