import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";

import InputText from "../InputText";
import ErrorMessage from "./ErrorMessage";
import Colours from "../../config/Colours";

function AppFormField({ name, errorMessage = true, onChange, ...otherprops }) {
  const { setFieldValue, errors, touched } = useFormikContext();

  return (
    <>
      <InputText
        onChangeText={(text) => {
          setFieldValue(name, text);
          onChange && onChange(text);
        }}
        placeholderTextColor={Colours.mediumgray}
        {...otherprops}
      />
      {errorMessage && (
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      )}
    </>
  );
}

export default AppFormField;
