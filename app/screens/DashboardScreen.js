import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";

import updateLocation from "../api/location";
import Card from "../components/Card";
import getLocation from "../components/Location";
import Screen from "../components/Screen";
import AppText from "../config/AppText";
import global from "../config/global.json";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";
import ListItem from "../components/ListItem";
import { getNotes } from "../api/notes";

// TOP BAR IS TOUCHABLE AND CHANGES HOUSEHOLDS

// SET NOTES IN useAuth()

function DashboardScreen({ navigation }) {
  const [Notes, setNotes] = useState([]);
  const { user, household } = useAuth();

  useEffect(() => {
    setNotes(household.notes);
  }, [household]);

  // console.log(user);
  // global.location = getLocation();

  // updateLocation(global.location.coords.latitude, global.location.coords.longitude, global.id);

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          {user.households_name[0]}
        </AppText>
      </View>
      <Screen>
        <ScrollView>
          <Card title="Fridge" onPress={() => navigation.navigate("Fridge")}>
            {household && (
              <FlatList
                scrollEnabled={false}
                data={Notes}
                keyExtractor={(Notes) => Notes.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    onPress={() => navigation.navigate("Fridge")}
                    title={item.note}
                    subTitle={item.user_id}
                  />
                )}
              />
            )}
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
