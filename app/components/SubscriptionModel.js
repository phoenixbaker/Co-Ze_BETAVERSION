import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import Card from "../components/cards/Card";
import AppText from "../config/AppText";

export default function SubscriptionModel({ containerStyle, onFree, onGold }) {
  return (
    <ScrollView horizontal pagingEnabled style={containerStyle}>
      <Card title="Free Model" cardStyle={{ width: 300 }} onPress={onFree}>
        <View>
          <AppText> Access Basic App Features: </AppText>
          <AppText> </AppText>
          <AppText> - Family Story </AppText>
          <AppText> - Access location services </AppText>
          <AppText> - Write notes on Fridge </AppText>
          <AppText> - Add events to Calender </AppText>
          <AppText> - Add expenses </AppText>
          <AppText> - Messaging service </AppText>
        </View>
      </Card>
      <Card title="Gold" cardStyle={{ width: 300 }} onPress={onGold}>
        <View>
          <AppText> Free Model Features Plus: </AppText>
          <AppText> - Set timed notification notes </AppText>
          <AppText> - See family members past 24hr location </AppText>
          <AppText> - Recieve Notifications when: </AppText>
          <AppText> - Fridge Updated </AppText>
          <AppText> - Story Uploaded </AppText>
          <AppText> - Expenses Updated </AppText>
          <AppText> - Events Uploaded </AppText>
          <AppText />
          <AppText style={{ alignSelf: "center" }}> | $12.99/month | </AppText>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
