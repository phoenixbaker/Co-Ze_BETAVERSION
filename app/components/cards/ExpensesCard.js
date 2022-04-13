import React from "react";
import { ProgressChart } from "react-native-chart-kit";

import Card from "./Card";

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

function ExpensesCard({ onPress }) {
  return (
    <Card title="Expenses" onPress={onPress}>
      <ProgressChart
        data={data}
        radius={20}
        height={256}
        width={300}
        chartConfig={chartConfig}
      />
    </Card>
  );
}

export default ExpensesCard;
