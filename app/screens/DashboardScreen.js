import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Screen from "../components/Screen";
import AppText from "../config/AppText";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";
import FridgeCard from "../components/cards/FridgeCard";
import FamilyMembersCard from "../components/cards/FamilyMembersCard";
import EventsCard from "../components/cards/EventsCard";
import ExpensesCard from "../components/cards/ExpensesCard";
import StoryReel from "../components/StoryReel";

// TOP BAR IS TOUCHABLE AND CHANGES HOUSEHOLDS

// SET NOTES IN useAuth()

function DashboardScreen({ navigation }) {
  const { user, household } = useAuth();

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          {user.households[0].name}
        </AppText>
      </View>
      <StoryReel />
      <Screen>
        <ScrollView style={styles.container}>
          <FridgeCard onPress={() => navigation.navigate("Fridge")} />
          <FamilyMembersCard onPress={() => navigation.navigate("Location")} />
          <EventsCard onPress={() => navigation.navigate("Events")} />
          <ExpensesCard onPress={() => navigation.navigate("Expenses")} />
        </ScrollView>
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
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default DashboardScreen;
