import React from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";
import { CommonActions } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import Colours from "../config/Colours";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { fetchAuth } from "../api/auth";
import useAuth from "../auth/useAuth";
import { getHousehold } from "../api/household";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const { logIn, updateUserImage } = useAuth();

  const validateLogin = async ({ email, password }) => {
    const user = await fetchAuth(email, password);
    if (!user.ok) return console.log("Not worked");
    if (!user.data.verified) {
      const data = user.data;
      return navigation.navigate("EmailVerificationScreen", { data });
    }
    await logIn(user.data, user.headers["x-auth-token"]);
    await updateUserImage(user.data);
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "UserNavigator" }],
      })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={{ bottom: 100 }}>
            <Image
              source={require("../assets/co-zy-logo.jpg")}
              style={{
                height: 120,
                width: 120,
                alignSelf: "center",
                borderRadius: 20,
              }}
            />
          </View>
          <View style={{ bottom: 20 }}>
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginStyle: {
    color: Colours.black,
  },
  background: {
    flex: 1,
    backgroundColor: Colours.white,
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
