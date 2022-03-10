import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, ...otherprops }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton text={title} onPress={handleSubmit} {...otherprops} />;
}

export default SubmitButton;
