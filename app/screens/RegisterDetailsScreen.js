import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import DropDown from "../components/DropDown";
import ListItem from "../components/ListItem";
import Colours from "../config/Colours";
import { postUser } from "../api/users";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  checkPassword: Yup.string().required().min(4).label("Check Password"),
  fullName: Yup.string().required().label("Full Name"),
  Day: Yup.string().label("Day"),
  Month: Yup.string().label("Month"),
  Year: Yup.string().label("Year"),
  number: Yup.string().min(9).max(11).label("Number"),
});
let dateYear;

export default function RegisterDetailsScreen({ route, navigation }) {
  const { registeredUser } = route.params;
  const { logIn } = useAuth();

  const [user, setUser] = useState(registeredUser);
  const [showAccount, setShowAccount] = useState(true);

  const [inputStyle, setInputStyle] = useState({
    email: user?.data?.email ? styles.inputOnFinish : styles.inputNotComplete,
    fullName: user?.data?.name ? styles.inputOnFinish : styles.inputNotComplete,
    number: styles.inputNotComplete,
    Day: styles.day,
    Month: styles.month,
    Year: styles.year,
    checkPassword: styles.inputNotComplete,
    password: styles.inputNotComplete,
  });

  const validateInput = (
    inputString,
    inputName,
    validation,
    onFinish = styles.inputOnFinish,
    notComplete = styles.inputNotComplete
  ) => {
    if (inputString.length === 0) return;
    for (var i = 0; i < inputString.length; i++) {
      if (validation(inputString[i - 1], inputString)) {
        return setInputStyle({
          ...inputStyle,
          [inputName]: onFinish,
        });
      }
    }
    return setInputStyle({
      ...inputStyle,
      [inputName]: notComplete,
    });
  };

  const handleSubmit = async ({
    email,
    password,
    fullName,
    number,
    Day,
    Month,
    Year,
  }) => {
    const DOBirth = Year + "-" + Month + "-" + Day;
    const socialData = user.from ? user.from : false;
    const verified = user.verified ? user.verified : false;
    const res = await postUser(
      email,
      password,
      DOBirth,
      fullName,
      number,
      socialData,
      verified
    );
    if (!res.ok) return console.warn(res.problem);
    if (!verified)
      return navigation.navigate("EmailVerificationScreen", {
        data: res.data,
      });
    await logIn(res.data, res.headers["x-auth-token"]);
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "UserNavigator" }],
      })
    );
  };

  useEffect(() => {
    dateYear = new Date().getFullYear().toString();
  }, []);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <AppForm
        initialValues={{
          email: user?.data?.email ? user.data.email : "",
          fullName: user?.data?.name ? user.data.name : "",
          number: "",
          Day: "",
          Month: "",
          Year: "",
          checkPassword: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ width: "90%", alignSelf: "center", margin: 15 }}>
            <DropDown
              shown={showAccount}
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
                  placeholder={user?.data?.name ? user.data.name : "FULL NAME"}
                  inputStyle={inputStyle?.fullName}
                  onChange={(inputString) => {
                    setUser({
                      ...user,
                      data: {
                        ...user.data,
                        name: inputString,
                      },
                    });
                    validateInput(inputString, "fullName", (char) => {
                      if (char === " ") return true;
                    });
                  }}
                />
                <AppFormField
                  name="email"
                  icon="email"
                  errorMessage={false}
                  placeholder={user?.data?.email ? user.data.email : "EMAIL"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  inputStyle={inputStyle?.email}
                  onChange={(inputString) => {
                    setUser({
                      ...user,
                      data: {
                        ...user.data,
                        email: inputString,
                      },
                    });
                    validateInput(inputString, "email", (char) => {
                      if (char === ".") return true;
                    });
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <AppFormField
                    name="Day"
                    icon="calendar"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder={user?.data?.day ? user.data.day : "DD"}
                    inputStyle={inputStyle?.Day}
                    onChange={(inputString) => {
                      setUser({
                        ...user,
                        data: {
                          ...user.data,
                          day: inputString,
                        },
                      });
                      validateInput(
                        inputString,
                        "Day",
                        (char, inputString) => {
                          if (
                            inputString.length === 1 ||
                            inputString.length === 2
                          ) {
                            if (inputString > 0 && inputString <= 31)
                              return true;
                          }
                        },
                        styles.dayComplete,
                        styles.day
                      );
                    }}
                  />
                  <AppFormField
                    name="Month"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder={user?.data?.month ? user.data.month : "MM"}
                    inputStyle={inputStyle?.Month}
                    onChange={(inputString) => {
                      setUser({
                        ...user,
                        data: {
                          ...user.data,
                          month: inputString,
                        },
                      });
                      validateInput(
                        inputString,
                        "Month",
                        (char, inputString) => {
                          if (
                            inputString.length === 1 ||
                            inputString.length === 2
                          ) {
                            if (inputString > 0 && inputString <= 12)
                              return true;
                          }
                        },
                        styles.monthComplete,
                        styles.month
                      );
                    }}
                  />
                  <AppFormField
                    name="Year"
                    errorMessage={false}
                    keyboardType="phone-pad"
                    placeholder={user?.data?.year ? user.data.year : "YYYY"}
                    inputStyle={inputStyle?.Year}
                    onChange={(inputString) => {
                      setUser({
                        ...user,
                        data: {
                          ...user.data,
                          year: inputString,
                        },
                      });
                      validateInput(
                        inputString,
                        "Year",
                        (char, inputString) => {
                          if (inputString.length === 4) {
                            if (inputString > 1900 && inputString <= dateYear)
                              return true;
                          }
                        },
                        styles.yearComplete,
                        styles.year
                      );
                    }}
                  />
                </View>
                <AppFormField
                  name="number"
                  errorMessage={false}
                  icon="phone"
                  keyboardType="phone-pad"
                  placeholder={
                    user?.data?.number ? user.data.number : "PHONE NUMBER"
                  }
                  inputStyle={inputStyle?.number}
                  onChange={(inputString) => {
                    setUser({
                      ...user,
                      data: {
                        ...user.data,
                        number: inputString,
                      },
                    });
                    validateInput(
                      inputString,
                      "number",
                      (char, inputString) => {
                        if (inputString.length == 10) return true;
                      }
                    );
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
                    secureTextEntry
                    autoCorrect={false}
                    placeholder={
                      user?.data?.password ? user.data.password : "PASSWORD"
                    }
                    onFocus={() => setShowAccount(false)}
                    inputStyle={inputStyle?.password}
                    onChange={(inputString) => {
                      setUser({
                        ...user,
                        data: {
                          ...user.data,
                          password: inputString,
                        },
                      });
                      validateInput(
                        inputString,
                        "password",
                        (char, inputString) => {
                          if (inputString.length >= 8) return true;
                        }
                      );
                    }}
                  />
                  <AppFormField
                    name="checkPassword"
                    errorMessage={false}
                    icon="key"
                    secureTextEntry
                    autoCorrect={false}
                    placeholder={
                      user?.data?.checkPassword
                        ? user.data.checkPassword
                        : "VERIFY PASSWORD"
                    }
                    inputStyle={inputStyle?.checkPassword}
                    onFocus={() => setShowAccount(false)}
                    onBlur={() => setShowAccount(true)}
                    onChange={(inputString) => {
                      setUser({
                        ...user,
                        data: {
                          ...user.data,
                          checkPassword: inputString,
                        },
                      });
                      validateInput(
                        inputString,
                        "checkPassword",
                        (char, inputString) => {
                          if (inputString === user.data.password) return true;
                        },
                        styles.inputOnFinish,
                        styles.failedInput
                      );
                    }}
                  />
                </View>
              </DropDown>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SubmitButton
          title="REGISTER"
          textStyle={{
            fontWeight: "700",
          }}
        />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  inputOnFinish: {
    borderWidth: 1,
    borderColor: Colours.primary,
  },
  inputNotComplete: {
    borderWidth: 2,
    borderColor: Colours.secondary,
  },
  failedInput: {
    borderWidth: 1,
    borderColor: Colours.danger,
  },
  day: {
    marginRight: 10,
    width: 100,
    borderWidth: 2,
    borderColor: Colours.secondary,
    alignSelf: "center",
  },
  dayComplete: {
    marginRight: 10,
    width: 100,
    borderWidth: 1,
    borderColor: Colours.primary,
    alignSelf: "center",
  },
  month: {
    marginRight: 10,
    paddingRight: 0,
    width: 100,
    borderWidth: 2,
    borderColor: Colours.secondary,
    alignContent: "center",
  },
  monthComplete: {
    marginRight: 10,
    paddingRight: 0,
    width: 100,
    borderWidth: 1,
    borderColor: Colours.primary,
    alignContent: "center",
  },
  year: {
    width: 150,
    borderWidth: 2,
    borderColor: Colours.secondary,
  },
  yearComplete: {
    width: 150,
    borderWidth: 1,
    borderColor: Colours.primary,
  },
});
