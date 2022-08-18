import React from "react";
import { View } from "react-native";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
} from "victory-native";
import Colours from "../../config/Colours";

import Card from "./Card";

// each value represents a goal ring in Progress chart
const data = {
  planned: [
    null,
    { x: "Week 2", y: 20 },
    { x: "Week 3", y: 20 },
    { x: "Week 4", y: 20 },
  ],
  actual: [
    { x: "Week 1", y: 50 },
    { x: "Week 2", y: 80 },
    { x: "Week 3", y: 50 },
    { x: "Week 4", y: 50 },
  ],
};

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
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryGroup style={{ width: "90%" }} offset={20}>
            <VictoryBar
              data={data.actual}
              style={{
                data: {
                  fill: Colours.secondary,
                },
              }}
              labels={({ datum }) => `${datum._y}`}
              animate
            />
            <VictoryBar
              animate
              data={data.planned}
              style={{
                data: {
                  fill: Colours.primary,
                },
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </View>
    </Card>
  );
}

export default ExpensesCard;
