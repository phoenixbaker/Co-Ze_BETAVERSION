import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFormikContext } from "formik";

import InputText from "../InputText";
import ErrorMessage from "./ErrorMessage";
import Colours from "../../config/Colours";

function AppFormField({ name, errorMessage = true, ...otherprops }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <InputText
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
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
