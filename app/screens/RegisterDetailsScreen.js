import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import DropDown from "../components/DropDown";
import ListItem from "../components/ListItem";
import Colours from "../config/Colours";
import { postUser } from "../api/users";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  fullName: Yup.string().required().label("Full Name"),
  DOBirth: Yup.string().label("DOB"),
});

export default function RegisterDetailsScreen({ route }) {
  const { registeredUser } = route.params;
  const [user, setUser] = useState(registeredUser);

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

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <AppForm
          initialValues={{
            email: user?.data.email ? user.data.email : "",
            fullName: user?.data.name ? user.data.name : "",
            number: "",
            Day: "",
            Month: "",
            Year: "",
            checkPassword: "",
            password: "",
          }}
          onSubmit={registerUser}
          validationSchema={validationSchema}
        >
          <View style={{ width: "90%", alignSelf: "center", margin: 15 }}>
            <DropDown
              shown
              placeHolder={
                <ListItem
                  disabled
                  title="Account Details"
                  titleStyle={{
                    fontWeight: "700",
                    color: Colours.white,
                    fontSize: 25,
                  }}
                  containerstyles={{
                    backgroundColor: Colours.secondary,
                    height: 80,
                    borderRadius: 20,
                  }}
                />
              }
            >
              <View style={{ paddingVertical: 10 }}>
                <AppFormField
                  name="fullName"
                  errorMessage={false}
                  icon="account-outline"
                  placeholder={user?.data.name ? user.data.name : "FULL NAME"}
                  inputStyle={{
                    borderWidth: 2,
                    borderColor: Colours.primary,
                  }}
                />
                <AppFormField
                  name="email"
                  icon="email"
                  errorMessage={false}
                  placeholder={user?.data.email ? user.data.email : "EMAIL"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  inputStyle={{
                    borderWidth: 2,
                    borderColor: Colours.primary,
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <AppFormField
                    name="Day"
                    icon="calendar"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder="DD"
                    inputStyle={{
                      marginRight: 10,
                      width: 100,
                      borderWidth: 2,
                      borderColor: Colours.primary,
                      alignSelf: "center",
                    }}
                  />
                  <AppFormField
                    name="Month"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder="MM"
                    inputStyle={{
                      marginRight: 10,
                      paddingRight: 0,
                      width: 100,
                      borderWidth: 2,
                      borderColor: Colours.primary,
                      alignContent: "center",
                    }}
                  />
                  <AppFormField
                    name="Year"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder="YYYY"
                    inputStyle={{
                      width: 150,
                      borderWidth: 2,
                      borderColor: Colours.primary,
                    }}
                  />
                </View>
                <AppFormField
                  name="number"
                  errorMessage={false}
                  icon="phone"
                  keyboardType="phone-pad"
                  placeholder="PHONE NUMBER"
                  inputStyle={{
                    borderWidth: 2,
                    borderColor: Colours.primary,
                  }}
                />
              </View>
            </DropDown>
            <View style={{ paddingVertical: 15 }}>
              <DropDown
                shown
                placeHolder={
                  <ListItem
                    disabled
                    title="Password"
                    titleStyle={{
                      fontWeight: "700",
                      color: Colours.white,
                      fontSize: 25,
                    }}
                    containerstyles={{
                      backgroundColor: Colours.secondary,
                      height: 80,
                      borderRadius: 20,
                    }}
                  />
                }
              >
                <View stlye={{ paddingVertical: 20 }}>
                  <AppFormField
                    name="password"
                    errorMessage={false}
                    icon="key-outline"
                    placeholder="PASSWORD"
                    inputStyle={{
                      borderWidth: 2,
                      borderColor: Colours.primary,
                    }}
                  />
                  <AppFormField
                    name="checkPassword"
                    errorMessage={false}
                    icon="key"
                    placeholder="VERIFY PASSWORD"
                    inputStyle={{
                      borderWidth: 2,
                      borderColor: Colours.primary,
                    }}
                  />
                </View>
              </DropDown>
            </View>
            <SubmitButton
              title="REGISTER"
              textStyle={{
                fontWeight: "700",
              }}
            />
          </View>
        </AppForm>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({});
