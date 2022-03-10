import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

import InputText from "../InputText";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, ...otherprops }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <InputText
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherprops}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
