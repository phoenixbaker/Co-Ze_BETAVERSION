import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colours from "../config/Colours";

import AddEvent from "./AddEvent";
import ListItem from "./ListItem";
import DisplayImage from "./DisplayImage";
import useAuth from "../auth/useAuth";
import AppButton from "./AppButton";

export default function EventHandler({
  items,
  day,
  eventDates,
  onFocus,
  onBlur,
}) {
  const [visible, setVisible] = useState(false);
  const [event, setEvent] = useState(undefined);

  const { img } = useAuth();

  return (
    <View>
      {event === undefined ? (
        <AddEvent day={day} onFocus={onFocus} onBlur={onBlur} />
      ) : (
        <>
          <AppButton
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: Colours.primary,
              borderRadius: 20,
              marginHorizontal: 15,
              width: 385,
            }}
            text="Add Event"
            textStyle={{
              color: Colours.primary,
            }}
            onPress={() => setVisible(!visible)}
          />
          {visible && <AddEvent day={day} onFocus={onFocus} onBlur={onBlur} />}
          <FlatList
            data={event[day.dateString]}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <>
                <ListItem
                  title={item.event.eventName}
                  subTitle={item.event.details}
                  JSXImage={<DisplayImage img={img[item.user._id]} />}
                  containerstyles={{
                    backgroundColor: Colours.titleCardGray,
                    borderRadius: 20,
                    margin: 15,
                  }}
                />
              </>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
