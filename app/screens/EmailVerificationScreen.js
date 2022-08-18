import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import useAuth from "../auth/useAuth";
import { fetchValidation } from "../api/auth";
import { postUser, validateEmail } from "../api/users";

export default function EmailVerificationScreen({ navigation, route }) {
  const { logIn } = useAuth();
  const { data } = route.params;

  let interval;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setInterval(() => {
        signIn(data.email, data.password);
      }, 5000);
    }
  }, []);

  const validation = async (email, password) => {
    await validateEmail(email, password);
  };

  validation(data.email, data.password);

  const signIn = async (email, password) => {
    const res = await fetchValidation(email, password);
    console.log("Why is this still running");
    if (!res.ok) console.log("yeah nah no good");
    if (res.data.verified) {
      clearInterval(interval);
      await logIn(res.data, res.headers["x-auth-token"]);
    }
  };

  return (
    <View>
      <Text>EmailVerificationScreen</Text>
    </View>
  );
}
