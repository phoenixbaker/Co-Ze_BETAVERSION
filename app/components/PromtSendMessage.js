import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SMS from "expo-sms";

import Colours from "../config/Colours";
import ListItem from "./ListItem";
import { getHouseholdCode } from "../api/household";

export default function PromtSendMessage() {
  const handleSendSMS = async () => {
    const { data } = await getHouseholdCode();
    const status = await SMS.sendSMSAsync(
      [],
      "Join my Household! http://123.208.183.180:5000/deeplinking/joinHousehold/" +
        data.code
    );
  };
  return (
    <ListItem
      title="SMS household linking code"
      titleStyle={{
        fontWeight: "500",
        fontSize: 16,
      }}
      containerstyles={{
        backgroundColor: Colours.titleCardGray,
      }}
      IconComponent={
        <MaterialCommunityIcons name="message" size={25} color="black" />
      }
      onPress={() => handleSendSMS()}
    />
  );
}

const styles = StyleSheet.create({});
