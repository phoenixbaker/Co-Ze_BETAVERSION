import React from "react";
import { View } from "react-native";

import Expenses from "../Expenses";
import Card from "./Card";

function ExpensesCard({ onPress }) {
  return (
    <Card title="Expenses" onPress={onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Expenses />
      </View>
    </Card>
  );
}

export default ExpensesCard;
