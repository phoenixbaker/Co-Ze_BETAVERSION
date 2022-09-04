import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={350} />
  </Transition.Together>
);

function DropDown({ placeHolder, children, shown = false, visibleCallBack }) {
  const [open, setOpen] = useState(shown);
  const ref = useRef();

  useEffect(() => {
    setOpen(shown);
  }, [shown]);

  const toggle = () => {
    setOpen(!open);
    visibleCallBack && visibleCallBack(!open);
    ref.current.animateNextTransition();
  };

  return (
    <Transitioning.View transition={transition} ref={ref}>
      <TouchableOpacity onPress={toggle}>{placeHolder}</TouchableOpacity>
      {open && children}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DropDown;
