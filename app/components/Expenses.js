import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryContainer,
} from "victory-native";

import Colours from "../config/Colours";
import useAuth from "../auth/useAuth";

export default function Expenses({}) {
  const { household } = useAuth();
  const [data, setData] = useState(household.expenses);
  const [plannedData, setPlannedData] = useState([]);
  const [actualData, setActualData] = useState([]);

  useEffect(() => {
    handleData();
    handleActualData();
  }, [household]);

  const handleData = () => {
    let tempData = [];
    data.forEach((expense) => {
      if (checkArr(expense, tempData))
        tempData.push({
          expense,
          x: expense.title,
          y: parseFloat(expense.value),
        });
    });
    if (tempData === []) return setPlannedData([]);
    return setPlannedData(tempData);
  };

  const checkArr = (expense, tempData) => {
    if (!tempData.length) return true;
    for (var i = 0; i < tempData.length; i++) {
      if (
        expense.title === tempData[i].expense.title &&
        expense.value === tempData[i].expense.value &&
        expense.details === tempData[i].expense.details
      )
        return false;
    }
    return true;
  };

  const handleActualData = () => {
    let tempData = [];
    data.forEach((expense) => {
      tempData.push({
        x: expense.title,
        y: expense?.cash ? expense.cash : 0,
      });
    });
    if (tempData === []) return setActualData([]);
    return setActualData(tempData);
  };

  return (
    <View>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryGroup offset={20}>
          <VictoryBar
            data={plannedData}
            style={{
              data: {
                fill: Colours.secondary,
              },
            }}
            labels={({ datum }) => `${datum._y}`}
          />
          <VictoryBar
            data={actualData}
            style={{
              data: {
                fill: Colours.primary,
              },
            }}
            labels={({ datum }) => {
              if (datum._y === 0) return "";
              return `${datum._y}`;
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({});
