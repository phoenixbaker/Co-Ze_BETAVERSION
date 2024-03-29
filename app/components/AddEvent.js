import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import Colours from "../config/Colours";
import { postEvent } from "../api/events";
import useAuth from "../auth/useAuth";
import AppButton from "./AppButton";
import { sendHouseholdNotification } from "../api/notification";

export default function addEvent({ day, onFocus, onBlur, onPress, visible }) {
  const { updateHousehold, household, user } = useAuth();
  const [display, setDisplay] = useState();
  const handleSubmit = async ({ eventName, eventType, details }) => {
    const res = await postEvent(eventName, eventType, details, day);
    if (!res.ok) console.warn(res.problem);
    updateHousehold(res.data);
    if (household.subscription === "Free") return;
    return sendHouseholdNotification(
      household.users,
      "Event has been Added",
      `${user.name}
${day.dateString}: ${eventName}`
    );
  };

  useEffect(() => {
    if (!visible) return setDisplay("none");
    return setDisplay("flex");
  }, [visible]);

  return (
    <View style={{ width: "90%", alignSelf: "center" }}>
      <View>
        <AppForm
          initialValues={{
            eventName: "",
            eventType: "",
            details: "",
          }}
          onSubmit={handleSubmit}
        >
          <View style={{ display: display }}>
            <AppFormField
              name="eventName"
              icon="calendar"
              placeholder="Event Name"
              inputStyle={styles.loginStyle}
              autoCorrect
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <AppFormField
              name="eventType"
              icon="music-note"
              placeholder="What Type of Event"
              inputStyle={styles.loginStyle}
              autoCorrect
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <AppFormField
              name="details"
              icon="pen"
              placeholder="Detail the event"
              inputStyle={styles.loginStyle}
              autoCorrect
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <SubmitButton
              title="Add Event"
              textStyle={{
                fontWeight: "700",
              }}
            />
          </View>
        </AppForm>
      </View>
      <AppButton
        text={visible ? "Close" : "Add Event"}
        buttonStyle={{
          width: "100%",
          alignSelf: "center",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: Colours.primary,
        }}
        textStyle={{
          color: Colours.primary,
        }}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginStyle: {
    color: Colours.black,
  },
});
