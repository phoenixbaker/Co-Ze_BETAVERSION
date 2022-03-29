import React from "react";
import { Text, View, StyleSheet } from "react-native";

import updateLocation from "../api/location";
import Card from "../components/Card";
import getLocation from "../components/Location";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import global from "../config/global.json";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";

// TOP BAR IS TOUCHABLE AND CHANGES HOUSEHOLDS

function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  // console.log(user);
  // global.location = getLocation();

  // updateLocation(global.location.coords.latitude, global.location.coords.longitude, global.id);

  console.log(user.households_name[0]);

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          {user.households_name[0]}
        </AppText>
      </View>
      <Screen>
        <Card title="Fridge">
          <AppText>NOTES AND CHECKLIST</AppText>
        </Card>
        <Card
          title="Family Members"
          onPress={() => navigation.navigate("Location")}
        >
          <AppText>PHOTO - NAME - Last Active *2 mins*</AppText>
        </Card>
        <Card title="Upcoming Events">
          <AppText>CALENDER COMPONENT</AppText>
        </Card>
        <Card title="Expenses">
          <AppText>Chart of Expenses</AppText>
        </Card>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 20,
    top: 15,
    textTransform: "capitalize",
  },
});

export default DashboardScreen;
