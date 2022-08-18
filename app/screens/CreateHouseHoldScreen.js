import React, { useContext } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import { postHousehold } from "../api/household";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import AuthContext from "../auth/context";
import useAuth from "../auth/useAuth";
import { getUserDetails } from "../api/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("name"),
});

function CreateHouseHoldScreen({ navigation }) {
  const { user, updateHousehold, updateUser } = useAuth();

  const registerHouseHold = async ({ name }) => {
    const result = await postHousehold(name, user._id);
    console.log("From post household");
    console.log(result.data);
    if (result.ok) {
      await updateHousehold(result.data.households[0]);
      const { data } = await getUserDetails(user._id);
      await updateUser(data);
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
