import React from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import Colours from "../config/Colours";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import fetchAuth from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { logIn } = useAuth();

  const validateLogin = async ({ email, password }) => {
    const result = await fetchAuth(email, password);
    if (result.ok) logIn(result.data);
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
            }}
            onSubmit={validateLogin}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="email"
              icon="email"
              placeholder="EMAIL"
              inputStyle={styles.loginStyle}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppFormField
              name="password"
              icon="key"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              placeholder="PASSWORD"
              inputStyle={styles.loginStyle}
              secureTextEntry
            />
            <SubmitButton
              title="LOGIN"
              textStyle={{
                fontWeight: "700",
              }}
            />
          </AppForm>
          <AppButton
            buttonStyle={styles.signupButton}
            textStyle={{
              textTransform: "none",
              textAlign: "center",
            }}
            text="Don't have an Account?
                        Sign Up"
            onPress={() => console.log("To Register")}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    marginBottom: 50,
    position: "absolute",
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colours.white,
  },
});

export default LoginScreen;
