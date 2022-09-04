import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import Screen from "../components/Screen";
import Card from "../components/cards/Card";
import SubscriptionModel from "../components/SubscriptionModel";
import { updateSubscription } from "../api/household";

export default function Subscription() {
  return (
    <Screen>
      <SubscriptionModel
        containerStyle={{
          width: "100%",
          alignSelf: "center",
          marginBottom: 10,
        }}
        onFree={async () => await updateSubscription("Free")}
        onGold={async () => await updateSubscription("Gold")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
