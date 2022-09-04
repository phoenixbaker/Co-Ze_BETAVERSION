import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";

import ListItemDeleteAction from "../components/ListItemDeleteAction";
import DropDown from "../components/DropDown";
import AppButton from "../components/AppButton";
import Colours from "../config/Colours";
import AppText from "../config/AppText";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import Expenses from "../components/Expenses";
import CalenderSelectDay from "../components/CalenderSelectDay";
import { postExpense, removeExpense } from "../api/expenses";
import ListItem from "../components/ListItem";
import useAuth from "../auth/useAuth";
import DisplayImage from "../components/DisplayImage";

function ExpensesScreen(props) {
  const { household, updateHousehold, img } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [selectDay, setSelectDay] = useState(false);
  const [advShown, setAdvShown] = useState(false);
  const [details, setDetails] = useState(null);
  const [date, setDate] = useState(null);
  const [recurs, setRecurs] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    handleData();
  }, [household.expenses]);

  const uploadExpense = async () => {
    if (!details.expense || !details.value)
      return Alert.alert(
        "Unable to Upload",
        "Make sure you insert values into expense name and value"
      );
    // console.log(details);
    const res = await postExpense(
      details.expense,
      details.value,
      date,
      recurs,
      details.details
    );
    if (!res.ok) return console.warn("Something wrong in uploadExpenses");
    updateHousehold(res.data);
  };

  const handleSelectDay = () => {
    console.log("here");
    setSelectDay(true);
  };

  const handleData = () => {
    let tempData = [];
    const data = household.expenses;
    data.forEach((expense) => {
      if (checkArr(expense, tempData)) tempData.push(expense);
    });

    return setData(tempData);
  };

  const checkArr = (expense, tempData) => {
    if (!tempData.length) return true;
    for (var i = 0; i < tempData.length; i++) {
      if (
        expense.title === tempData[i].title &&
        expense.value === tempData[i].value &&
        expense.details === tempData[i].details
      )
        return false;
    }
    return true;
  };

  const handleDelete = async (item) => {
    const res = await removeExpense(item);
    if (!res.ok) return res.warn("Error in Expenses Screen Handle Delete");
    updateHousehold(res.data);
  };

  if (selectDay) {
    return (
      <Screen>
        <CalenderSelectDay
          callBack={(day) => {
            const selDates = Object.entries(day);
            setDate({
              dateString: selDates[0][0],
              timeStamp: selDates[0][1].timestamp,
            });
            setSelectDay(false);
          }}
        />
      </Screen>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Expenses
        </AppText>
      </View>
      <Screen
        style={{
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: !isVisible ? "flex" : "none", flex: 1 }}>
          <Expenses />
          <FlatList
            style={{
              borderWidth: 2,
              borderColor: Colours.primary,
              borderRadius: 25,
              marginHorizontal: 10,
            }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
                  )}
                  JSXImage={<DisplayImage img={img[item.user._id]} />}
                  title={`$${item.value} ${item.title}`}
                  subTitle={item.details !== "" && item.details}
                />
              );
            }}
          />
        </View>
        <View
          style={{
            display: isVisible ? "flex" : "none",
            flex: 1,
            justifyContent: "flex-start",
            marginTop: 15,
            alignSelf: "center",
            width: "90%",
          }}
        >
          <AppForm
            initialValues={{ expense: "", value: "", details: "" }}
            onSubmit={uploadExpense}
          >
            <View style={{ display: advShown ? "none" : "flex" }}>
              <AppFormField
                name="expense"
                icon="home"
                placeholder={details?.expense || "EXPENSE NAME"}
                onChange={(inputString) => {
                  setDetails({
                    ...details,
                    expense: inputString,
                  });
                }}
              />
              <AppFormField
                name="value"
                icon="cash"
                placeholder={details?.value || "VALUE"}
                onChange={(inputString) => {
                  setDetails({
                    ...details,
                    value: inputString,
                  });
                }}
              />
            </View>
            <DropDown
              visibleCallBack={(val) => setAdvShown(val)}
              placeHolder={
                <AppButton
                  disabled
                  text="Advanced Settings"
                  textStyle={{
                    color: Colours.white,
                  }}
                  buttonStyle={{
                    backgroundColor: Colours.secondary,
                  }}
                />
              }
            >
              <AppButton
                text={date ? `Date: ${date.dateString}` : "Select Date"}
                textStyle={{
                  color: Colours.mediumgray,
                }}
                buttonStyle={{
                  backgroundColor: Colours.titleCardGray,
                }}
                onPress={() => handleSelectDay()}
              />
              <DropDown
                shown={!date}
                placeHolder={
                  <AppButton
                    disabled
                    text={
                      recurs
                        ? recurs === "Never"
                          ? `Recurs ${recurs}`
                          : `Recurs Every ${recurs}`
                        : "Recurs Every..."
                    }
                    textStyle={{
                      color: Colours.mediumgray,
                    }}
                    buttonStyle={{
                      backgroundColor: Colours.titleCardGray,
                    }}
                  />
                }
              >
                <View style={{ width: "85%", alignSelf: "center" }}>
                  <AppButton
                    text="Never"
                    textStyle={{
                      color: Colours.mediumgray,
                    }}
                    buttonStyle={{
                      backgroundColor: Colours.lightgray,
                    }}
                    onPress={() => setRecurs("Never")}
                  />
                  <AppButton
                    text="Week"
                    textStyle={{
                      color: Colours.mediumgray,
                    }}
                    buttonStyle={{
                      backgroundColor: Colours.lightgray,
                    }}
                    onPress={() => setRecurs("Week")}
                  />
                  <AppButton
                    text="Fortnite"
                    textStyle={{
                      color: Colours.mediumgray,
                    }}
                    buttonStyle={{
                      backgroundColor: Colours.lightgray,
                    }}
                    onPress={() => setRecurs("Fortnite")}
                  />
                  <AppButton
                    text="Month"
                    textStyle={{
                      color: Colours.mediumgray,
                    }}
                    buttonStyle={{
                      backgroundColor: Colours.lightgray,
                    }}
                    onPress={() => setRecurs("Month")}
                  />
                </View>
              </DropDown>
              <AppFormField
                onChange={(inputString) => {
                  setDetails({
                    ...details,
                    details: inputString,
                  });
                }}
                name="details"
                icon="note"
                placeholder={
                  details?.details ? details.details : "EXPENSE DETAILS"
                }
              />
            </DropDown>

            <SubmitButton title="Upload Expense" />
          </AppForm>
        </View>

        <AppButton
          text={isVisible ? "Close" : "Add Expense"}
          buttonStyle={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: Colours.primary,
          }}
          textStyle={{
            color: Colours.primary,
          }}
          onPress={() => setIsVisible(!isVisible)}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default ExpensesScreen;
