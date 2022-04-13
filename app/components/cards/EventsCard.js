import React from "react";
import { StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import Colours from "../../config/Colours";

import Card from "./Card";

function EventsCard({ onPress }) {
  return (
    <Card title="Upcoming Events" onPress={onPress} styles={styles.container}>
      <CalendarList
        horizontal={true}
        // pagingEnabled={true}
        calendarStyle={styles.calendar}
        calendarWidth={350}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  calendar: {},
});

export default EventsCard;
