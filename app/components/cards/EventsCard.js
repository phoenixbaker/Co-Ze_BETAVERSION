import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

import Colours from "../../config/Colours";
import { useIsFocused } from "@react-navigation/native";
import Card from "./Card";

function EventsCard({ onPress }) {
  const [markers, setMarkers] = useState({});
  const { household } = useAuth();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleMarkers();
    }
  }, [household]);

  const handleMarkers = () => {
    setMarkers({});
    if (!household.entries) return;
    Object.entries(household.events).forEach((event, i) => {
      return setMarkers((...prevList) => ({
        ...prevList,
        [event[0]]: {
          marked: true,
          selectedColor: "green",
        },
      }));
    });
  };

  return (
    <Card title="Upcoming Events" onPress={onPress} styles={styles.container}>
      <Calendar
        calendarStyle={styles.calendar}
        calendarWidth={370}
        markedDates={markers}
        theme={{
          calendarBackground: Colours.lightgray,
          textSectionTitleColor: Colours.secondary,
          todayTextColor: Colours.primary,
          dayTextColor: Colours.gray,
          arrowColor: Colours.primary,
          monthTextColor: Colours.black,
          textMonthFontSize: 17,
          textDayFontSize: 18,
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  calendar: {},
});

export default EventsCard;
