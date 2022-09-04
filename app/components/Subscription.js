import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/ListItem";

export default function Subscription({ onPress }) {
  return (
    <ListItem
      title="Subscription"
      titleStyle={{
        fontWeight: "600",
      }}
      onPress={onPress}
      containerstyles={{ backgroundColor: "#ffc60a" }}
      IconComponent={<MaterialCommunityIcons name="key" size={40} />}
    />
  );
}

const styles = StyleSheet.create({});
