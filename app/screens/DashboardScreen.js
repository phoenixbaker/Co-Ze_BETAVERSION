import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import * as Location from "expo-location";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { getLngLatLocation, getStreetlocation } from "../api/location";
import Card from "../components/Card";
import getLocation from "../components/Location";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import global from "../config/global.json";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";
import ListItem from "../components/ListItem";
import { getNotes } from "../api/notes";
import FridgeCard from "../components/FridgeCard";
import FamilyMembersCard from "../components/FamilyMembersCard";
import { getProfilePicture } from "../api/users";

// TOP BAR IS TOUCHABLE AND CHANGES HOUSEHOLDS

// SET NOTES IN useAuth()

function DashboardScreen({ navigation }) {
  const { user, img, household } = useAuth();

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          {user.households_name[0]}
        </AppText>
      </View>
      <Screen>
        <ScrollView style={styles.container}>
          <FridgeCard onPress={() => navigation.navigate("Fridge")} />
          <FamilyMembersCard onPress={() => navigation.navigate("Location")} />
          <Card title="Upcoming Events">
            <AppText>CALENDER COMPONENT</AppText>
          </Card>
          <Card title="Expenses">
            <AppText>Chart of Expenses</AppText>
          </Card>
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
