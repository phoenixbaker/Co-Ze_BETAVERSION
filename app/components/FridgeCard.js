import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import ListItem from "./ListItem";
import useAuth from "../auth/useAuth";
import Card from "./Card";
import NoteList from "./NoteList";

function FridgeCard({ onPress }) {
  const { household, getHouseholdInfo } = useAuth();

  useEffect(() => {
    getHouseholdInfo();
  }, []);

  return (
    <Card title="Fridge" onPress={onPress}>
      <NoteList
        listStyle={styles.listContainer}
        imageStyle={styles.image}
        note={household.notes.note}
        icon={household.notes.user_img_id}
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
