import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Colours from "../config/Colours";
import AuthContext from "../hooks/auth/context";
import authStorage from "../hooks/auth/storage";
import useAuth from "../hooks/auth/useAuth";

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          titleStyle={{
            fontWeight: "700",
          }}
          subTitle={user.email}
          image={require("../assets/ProfilePicture.jpg")}
        />
        <ListItem
          title="LOGOUT"
          titleStyle={{
            fontWeight: "700",
          }}
          IconComponent={
            <MaterialCommunityIcons name="logout" size={40} color="black" />
          }
          onPress={() => logOut()}
          // Create Nav for each screen
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
