import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={350} />
  </Transition.Together>
);

function DropDown({ placeHolder, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setOpen(false);
  }, []);

  const toggle = () => {
    setOpen(!open);
    ref.current.animateNextTransition();
  };

  return (
    <Transitioning.View transition={transition} ref={ref}>
      <TouchableOpacity onPress={toggle}>
        {placeHolder}
        {open && children}
      </TouchableOpacity>
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DropDown;
