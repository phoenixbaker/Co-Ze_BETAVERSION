import React, { useContext } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import postHousehold from "../api/household";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import AuthContext from "../hooks/auth/context";
import useAuth from "../hooks/auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("name"),
});

function CreateHouseHoldScreen({ navigation }) {
  const { user, newHouseHold } = useAuth();
  console.log(user);

  const registerHouseHold = async ({ name }) => {
    const result = await postHousehold(name, user._id);
    if (result.ok) {
      console.log(result);
      newHouseHold(result.data._id, result.data.name);
      navigation.navigate("Dashboard");
    }
  };
  return (
    <Screen>
      <AppForm
        initialValues={{
          name: "",
        }}
        onSubmit={registerHouseHold}
        validationSchema={validationSchema}
      >
        <AppFormField name="name" icon="home" placeholder="HOUSEHOLD NAME" />
        <SubmitButton
          title="REGISTER"
          textStyle={{
            fontWeight: "700",
          }}
        />
      </AppForm>
    </Screen>
  );
}

export default CreateHouseHoldScreen;
