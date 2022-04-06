import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Colours from "../config/Colours";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import useAuth from "../auth/useAuth";
import { getProfilePicture } from "../api/users";
import ImageInput from "../components/ImageInput";
import DropDown from "../components/DropDown";

function AccountScreen({ navigation }) {
  const { user, logOut, img, household } = useAuth();

  const displayImage = (img) => {
    // console.log(img);
    return "data:image/png;base64," + img;
  };

  return (
    <Screen>
      <View style={styles.container}>
        <DropDown
          DropDownHeader={
            <ListItem
              DisableOnPress
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
          }
        >
          <ListItem
            title="Profile Picture"
            titleStyle={{
              fontWeight: "600",
            }}
            IconComponent={
              <MaterialCommunityIcons name="camera" size={40} color="black" />
            }
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
        </DropDown>

        <ListItem
          title="Household"
          titleStyle={{
            fontWeight: "700",
            color: Colours.white,
          }}
          subTitle={household.name}
          subTitleStyle={{
            color: Colours.lightgray,
          }}
          containerstyles={{
            backgroundColor: Colours.secondary,
          }}
          IconComponent={
            <MaterialCommunityIcons
              name="home"
              size={55}
              color={Colours.white}
            />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.lightgray,
    borderRadius: 20,
  },
});

export default AccountScreen;
