import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";

import ListItem from "../ListItem";
import useAuth from "../../auth/useAuth";
import Card from "./Card";
import NoteList from "../NoteList";
import AppButton from "../AppButton";

function FridgeCard({ onPress }) {
  const { household } = useAuth();

  useEffect(() => {}, [household]);

  return (
    <Card title="Fridge" onPress={onPress}>
      <NoteList
        titleStyle={{
          fontSize: 16,
        }}
        imageStyle={{
          height: 60,
          width: 60,
        }}
        renderNoNotes={
          <AppButton text="Click to add notes" onPress={onPress} />
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});

export default FridgeCard;
