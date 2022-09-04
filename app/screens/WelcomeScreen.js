import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import AppText from "../config/AppText";
import AppButton from "../components/AppButton";
import Colours from "../config/Colours";

function WelcomeScreen({ route, navigation }) {
  return (
    <ImageBackground
      source={require("../assets/familyphoto.jpg")}
      blurRadius={6}
      style={styles.imageBackground}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../assets/co-zy-logo.jpg")}
        />
        <View style={styles.logoTextContainer}>
          <AppText style={styles.title}>Co-Zy Family</AppText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          text="Login"
          textStyle={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          text="Register"
          buttonStyle={styles.registerContainer}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "95%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 60,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
    top: 75,
  },
  logoImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  logoTextContainer: {
    borderRadius: 20,
  },
  registerContainer: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 3,
  },
  loginText: {
    fontWeight: "600",
  },
  title: {
    color: Colours.darkgray,
    fontWeight: "bold",
    fontSize: 28,
    margin: 10,
    padding: 10,
  },
});

export default WelcomeScreen;
