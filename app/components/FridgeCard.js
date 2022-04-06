import React, { useEffect } from "react";
import { FlatList } from "react-native";

import ListItem from "./ListItem";
import useAuth from "../auth/useAuth";
import Card from "./Card";

function FridgeCard({ onPress }) {
  const { household } = useAuth();

  return (
    <Card title="Fridge" onPress={onPress}>
      <FlatList
        scrollEnabled={false}
        data={household.notes}
        renderItem={({ item }) => (
          <ListItem
            onPress={onPress}
            title={item.note}
            subTitle={item.user_id}
          />
        )}
      />
    </Card>
  );
}

export default FridgeCard;
