import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import Colours from "../config/Colours";
import AppText from "../config/AppText";
import Screen from "../components/Screen";

function EventsScreen(props) {
  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Calendar
        </AppText>
      </View>
      <Screen>
        <CalendarList
          //   onDayPress={(day) => {
          //     console.log("selected day", day);
          //   }}
          //   onDayLongPress={(day) => {
          //     console.log("long press selected day", day);
          //   }}
          //   onMonthChange={(month) => {
          //     console.log("month changed", month);
          //   }}
          markedDates={{
            "2022-04-14": {
              selected: true,
              selectedColor: "green",
            },
          }}
          //   onVisibleMonthsChange={(months) => {
          //     console.log("now these months are visable", months);
          //   }}
        />
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

export default EventsScreen;
