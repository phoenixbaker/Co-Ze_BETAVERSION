import React, { useEffect } from "react";
import { View, Button } from "react-native";
import * as Calendar from "expo-calendar";

import Screen from "../components/Screen";
import { Platform } from "expo-modules-core";

function EventsScreen(props) {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("here are all your events");
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <Screen>
      <Button title="New Calendar plz" onPress={createCalendar} />
    </Screen>
  );
}

const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

const createCalendar = async () => {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`your new calendar ID is : ${newCalendarID}`);
};

export default EventsScreen;
