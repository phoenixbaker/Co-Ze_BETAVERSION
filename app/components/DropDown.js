import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function DropDown({ children, DropDownHeader }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(true);
    console.log(open);
  };

  return (
    <TouchableOpacity onPress={toggle}>
      {DropDownHeader}
      {open && children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DropDown;
