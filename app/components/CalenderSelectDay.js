import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";
import Colours from "../config/Colours";
import AppButton from "./AppButton";

export default function CalenderSelectDay({ callBack }) {
  const [selectedDay, setSelectedDay] = useState({});

  const handleSelectedDay = (day) => {
    setSelectedDay({
      [day.dateString]: {
        selected: true,
        selectedColor: Colours.primary,
        timestamp: day.timestamp,
      },
    });
    return;
  };

  const getMarkedDates = () => {
    let dates = selectedDay;
    let markedDates = JSON.parse(JSON.stringify(dates));
    return markedDates;
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <CalendarList
          style={{ height: 600 }}
          markedDates={getMarkedDates()}
          onDayPress={(day) => {
            handleSelectedDay(day);
          }}
        />
      </View>
      <AppButton
        text="Completed"
        onPress={() => {
          callBack(selectedDay);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
