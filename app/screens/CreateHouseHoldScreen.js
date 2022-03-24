import React, { useContext } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import global from "../config/global.json";
import postHousehold from "../api/household";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("name"),
});

function CreateHouseHoldScreen({ navigation }) {
  const user = useContext(AuthContext);
  console.log(user);

  const registerHouseHold = async ({ name }) => {
    const result = await postHousehold(name, user._id);
    if (result.ok)
      navigation.reset({ index: -1, routes: [{ name: "Dashboard" }] });
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
