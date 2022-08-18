import React from "react";
import {
  ImageBackground,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { postUser, validateEmail } from "../api/users";
import AppButton from "../components/AppButton";

// MAKE DOB HAVE // IN INPUT
// CLEAN CODE
// CENTER
// MAKE ANOTHER PAGE BEFORE THIS FOR OTHER OPTIONS
// WRAP INITIAL NAVIGATION CODE INSIDE IMAGEBACKGROUND SO ANIMATION DOESNT HAPPEN

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  fullName: Yup.string().required().label("Full Name"),
  DOBirth: Yup.string().label("DOB"),
});

function RegisterScreen({ navigation }) {
  const registerUser = async ({ email, password, fullName, DOBirth }) => {
    let res = await postUser(email, password, DOBirth, fullName);
    // console.log(res.data);
    if (res.ok) {
      const data = res.data;
      return navigation.navigate("EmailVerificationScreen", {
        data,
      });
    }
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
              email: "",
              password: "",
              fullName: "",
              DOBirth: "",
            }}
            onSubmit={registerUser}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="fullName"
              icon="account-outline"
              placeholder="FULL NAME"
            />
            <AppFormField
              name="email"
              icon="email"
              placeholder="EMAIL"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppFormField
              name="DOBirth"
              icon="calendar"
              keyboardType="phone-pad"
              placeholder="DD/MM/YYYY"
            />
            <AppFormField
              name="password"
              icon="key"
              placeholder="PASSWORD"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              secureTextEntry
            />
            <SubmitButton
              title="REGISTER"
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
    backgroundColor: "transparent",
    top: 65,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});

export default RegisterScreen;
