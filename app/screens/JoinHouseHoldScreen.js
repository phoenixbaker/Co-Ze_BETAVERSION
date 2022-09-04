import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import Colours from "../config/Colours";
import { joinHouseholdwithCode } from "../api/household";
import useAuth from "../auth/useAuth";
import { getUserDetails } from "../api/users";
import AppButton from "../components/AppButton";

export default function JoinHouseHoldScreen({ route, navigation }) {
  const { logIn, logOut, user, setHouseholdLinkID, householdLinkID } =
    useAuth();
  const joinHousehold = async ({ householdKey }) => {
    console.log(householdKey);
    let res = await joinHouseholdwithCode(householdKey);
    if (!res.ok) return console.log(res.data);
    console.log("You joined a huoseholddd");
    console.log(res.headers);
    await logIn(res.data, res.headers["x-auth-token"]);
    setHouseholdLinkID(null);
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "DashboardNavigator" }],
      })
    );
  };

  useEffect(() => {
    if (route.params) setHouseholdLinkID(route.params.householdId);
    console.log(householdLinkID);
    if (user) return;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "AuthNavigator",
          },
        ],
      })
    );
  }, [householdLinkID]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../assets/familyphoto.jpg")}
        blurRadius={8}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <AppForm
            initialValues={{
              householdKey: householdLinkID ? householdLinkID : "",
            }}
            onSubmit={joinHousehold}
          >
            <AppFormField
              name="householdKey"
              icon="key"
              placeholder={householdLinkID ? householdLinkID : "HOUSEHOLD KEY"}
              autoCorrect={false}
              inputStyle={{ color: Colours.black }}
            />
            <SubmitButton
              title="JOIN HOUSEHOLD"
              textStyle={{
                fontWeight: "700",
              }}
            />
          </AppForm>
          <AppButton
            text="Log Out"
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 3,
              borderColor: Colours.titleCardGray,
            }}
            onPress={() => {
              logOut();
              return navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "AuthNavigator" }],
                })
              );
            }}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginBottom: 50,
    position: "absolute",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
