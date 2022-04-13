import React from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

import Screen from "../components/Screen";

// each value represents a goal ring in Progress chart
const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8],
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function ExpensesScreen(props) {
  return (
    <Screen>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={256}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
      />
    </Screen>
  );
}

export default ExpensesScreen;
