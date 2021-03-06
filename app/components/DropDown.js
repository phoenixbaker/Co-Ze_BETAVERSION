import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Transition, Transitioning } from "react-native-reanimated";

import Colours from "../config/Colours";
import useAuth from "../auth/useAuth";
import ListItem from "./ListItem";
import { getProfilePicture } from "../api/users";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={350} />
  </Transition.Together>
);

function DropDown({ navigate_Profile_Picture }) {
  const [open, setOpen] = useState(false);
  const { user, logOut, img, setImg } = useAuth();
  const ref = useRef();

  useEffect(() => {
    setOpen(false);
  }, []);

  const displayImage = (img) => {
    return "data:image/png;base64," + img;
  };

  const toggle = () => {
    setOpen(!open);
    ref.current.animateNextTransition();
  };

  return (
    <Transitioning.View transition={transition} ref={ref}>
      <ListItem
        onPress={toggle}
        title={user.name}
        titleStyle={{
          fontWeight: "700",
          color: Colours.white,
        }}
        subTitle={user.email}
        subTitleStyle={{
          color: Colours.lightgray,
        }}
        image={{ uri: displayImage(img) }}
        imageStyle={{
          borderColor: Colours.lightgray,
          borderWidth: 1,
        }}
        containerstyles={{ backgroundColor: Colours.primary }}
      />
      {open && (
        <View>
          <ListItem
            title="Profile Picture"
            titleStyle={{
              fontWeight: "600",
            }}
            IconComponent={
              <MaterialCommunityIcons name="camera" size={40} color="black" />
            }
            onPress={navigate_Profile_Picture}
          />
          <ListItem
            title="LOGOUT"
            titleStyle={{
              fontWeight: "600",
            }}
            IconComponent={
              <MaterialCommunityIcons name="logout" size={40} color="black" />
            }
            onPress={() => logOut()}
            // Create Nav for each screen
          />
        </View>
      )}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DropDown;
