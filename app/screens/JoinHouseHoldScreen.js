import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import Colours from "../config/Colours";
import { joinHouseholdwithCode } from "../api/household";
import useAuth from "../auth/useAuth";
import { getUserDetails } from "../api/users";

export default function JoinHouseHoldScreen() {
  const { updateHousehold, updateUser } = useAuth();
  const joinHousehold = async ({ householdKey }) => {
    let res = await joinHouseholdwithCode(householdKey);
    if (!res.ok) return console.log(res.data);
    console.log("You joined a huoseholddd");
    console.log(res.data);
    await updateHousehold(res.data.households[0]);
    await updateUser(res.data);
  };

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
              householdKey: "",
            }}
            onSubmit={joinHousehold}
          >
            <AppFormField
              name="householdKey"
              icon="key"
              placeholder="HOUSEHOLD KEY"
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
