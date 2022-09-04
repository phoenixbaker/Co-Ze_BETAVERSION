import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import useAuth from "../auth/useAuth";
import AppButton from "../components/AppButton";
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppText from "../config/AppText";
import Colours from "../config/Colours";

function NewUserDashboardScreen({ navigation }) {
  const { logOut, user } = useAuth();

  return (
    <>
      <View style={styles.screenHeader}>
        <AppText style={styles.headerText} autoCapitalize>
          {user.name}
        </AppText>
      </View>
      <ImageBackground
        source={require("../assets/familyphoto.jpg")}
        blurRadius={7}
        style={styles.imageBackground}
      >
        <View style={styles.buttonContainer}>
          <AppButton
            text="Join A Household"
            onPress={() => navigation.navigate("JoinHouseHold")}
          />
          <AppButton
            text="Make A New Household"
            onPress={() => navigation.navigate("CreateHouseHold")}
          />
          <AppButton
            text="Log Out"
            onPress={() => {
              logOut();
              return navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "AuthNavigator" }],
                })
              );
            }}
            buttonStyle={styles.logoutButton}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "85%",
  },
  container: {
    backgroundColor: Colours.secondary,
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  logoutButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colours.white,
  },
  screenHeader: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colours.primary,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewUserDashboardScreen;
