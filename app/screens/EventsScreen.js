import React, { createContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Touchable } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

import EventHandler from "../components/EventHandler";
import Colours from "../config/Colours";
import AppText from "../config/AppText";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import DisplayImage from "../components/DisplayImage";
import AddEvent from "../components/AddEvent";

function EventsScreen(props) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [items, setItems] = useState();
  const [selected, setSelected] = useState(false);
  const [eventDates, setEventDates] = useState();

  const { household, img } = useAuth();

  const handleMarkers = () => {
    let tempObj = {};
    let tempDates = [];
    Object.entries(household.events).forEach((event, i) => {
      event[1].forEach((dayEvent) => {
        tempDates.push(event[0]);

        if (!tempObj[event[0]]) {
          return (tempObj[event[0]] = [
            {
              name: dayEvent.event.eventName,
              details: dayEvent.event.details,
              type: dayEvent.event.eventType,
              user: dayEvent.user._id,
            },
          ]);
        }
        return tempObj[event[0]].push({
          name: dayEvent.event.eventName,
          details: dayEvent.event.details,
          type: dayEvent.event.eventType,
          user: dayEvent.user._id,
        });
      });
    });
    setItems(tempObj);
    setEventDates(tempDates);
    loadItems({ timestamp: Date.now() });
    // const time = Date.now();
  };

  useEffect(() => {
    handleMarkers();
  }, [household.events]);

  const handleDaySelect = (day) => {
    return setSelectedDay(day);
  };

  const loadItems = (day) => {
    for (let i = -7; i < 14; i++) {
      let timeAdded = Math.abs(i) * 24 * 60 * 60 * 1000;
      if (i < 0) timeAdded *= -1;
      const time = day.timestamp + timeAdded;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const renderItem = (item) => {
    console.log(item);
    return (
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <ListItem
          title={item.name}
          containerstyles={{
            width: "90%",
            backgroundColor: "transparent",
            margin: 10,
            borderColor: Colours.primary,
            borderWidth: 2,
            borderRadius: 15,
          }}
          subTitle={item.details !== "" && item.details}
          detailContainerStyles={{ justifyContent: "center" }}
          JSXImage={
            <DisplayImage
              img={img[item.user]}
              imageStyle={{ width: 60, height: 60 }}
            />
          }
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Calendar
        </AppText>
      </View>
      <Screen>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Agenda
              items={items}
              onDayPress={(day) => {
                loadItems(day);
                handleDaySelect(day);
              }}
              onDayChange={(day) => loadItems(day)}
              // loadItemsForMonth={loadItems}
              renderItem={renderItem}
            />
          </View>
          <View stlye={{ flex: 0.2 }}>
            <AddEvent
              day={selectedDay}
              onPress={() => setSelected(!selected)}
              visible={selected}
            />
          </View>
        </View>
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
