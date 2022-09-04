import React, { useContext, useState } from "react";
import { FlatList, View, Alert } from "react-native";
import * as Yup from "yup";

import { postHousehold } from "../api/household";
import ListItem from "../components/ListItem";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import SubscriptionModel from "../components/SubscriptionModel";
import useAuth from "../auth/useAuth";
import DropDown from "../components/DropDown";
import { getUserDetails } from "../api/users";
import Colours from "../config/Colours";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("name"),
});

function CreateHouseHoldScreen({ navigation }) {
  const { user, updateHousehold, logIn } = useAuth();
  const [householdAddress, setHouseholdAddress] = useState(null);
  const [input, setInput] = useState(null);
  const [data, setData] = useState([]);
  const [subscription, setSubscription] = useState("Free");

  const registerHouseHold = async ({ name }) => {
    if (!name || !householdAddress) return;
    const location = {
      longitude: householdAddress.lon,
      latitude: householdAddress.lat,
    };
    console.log(location);
    const res = await postHousehold(name, location, subscription, user._id);
    if (!res.ok) return console.warn("Something wrong in register Household");
    await logIn(res.data, res.headers["x-auth-token"]);
    return navigation.navigate("Dashboard");
  };

  const onChangeText = async (text) => {
    setInput(text);
    await searchAddress(text);
  };

  const searchAddress = async (address) => {
    if (address.length < 3) return setData([]);
    console.log(address);
    const apiToken = "pk.4fefa7166954cbe76bbba55957fc6805";
    const endPoint = `https://api.locationiq.com/v1/autocomplete?key=${apiToken}&q=${address}&limit=5`;
    const res = await fetch(endPoint);
    if (!res) return;
    const data = await res.json();
    if (data.length > 0) setData(data);
  };

  const handleShowNumber = () => {
    let temp = "";
    for (var i = 0; i < input.length; i++) {
      if (input[i] === " ") return (temp += "");
      temp += input[i];
    }
  };

  const handleYes = (item) => {
    console.log(item.display_address);
    setInput(item.display_address);
    setHouseholdAddress(item);
  };

  return (
    <Screen>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <AppForm
          initialValues={{
            name: "",
            homeAddress: householdAddress,
          }}
          onSubmit={registerHouseHold}
          validationSchema={validationSchema}
        >
          <AppFormField name="name" icon="home" placeholder="HOUSEHOLD NAME" />
          <AppFormField
            name="homeAddress"
            icon="home"
            placeholder="ENTER HOME ADDRESS"
            onChange={onChangeText}
            value={input}
          />
          <FlatList
            data={data}
            scrollEnabled={false}
            style={{
              backgroundColor: Colours.titleCardGray,
              borderRadius: 25,
            }}
            renderItem={({ item, index }) => {
              if (item.type !== "house" && item.type !== "residential") return;

              let number = item.address?.house_number;
              if (!number) number = handleShowNumber();
              return (
                <ListItem
                  onPress={() => {
                    Alert.alert(
                      `Set Household Address`,
                      `Are you sure you want to set ${item.display_address} as your address?`,
                      [
                        {
                          text: "No",
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          style: "default",
                          onPress: () => {
                            handleYes(item);
                            setData(null);
                          },
                        },
                      ]
                    );
                  }}
                  title={number + " " + item.address.name}
                  subTitle={item.address.city + " " + item.address.postcode}
                />
              );
            }}
          />
          <DropDown
            placeHolder={
              <AppButton
                text="Subscriptions"
                textStyle={{
                  color: Colours.darkgray,
                }}
                disabled={true}
                buttonStyle={{
                  backgroundColor: Colours.lightgray,
                  borderRadius: 20,
                  borderColor: Colours.primary,
                  borderWidth: 2,
                }}
              />
            }
          >
            <SubscriptionModel
              containerStyle={{
                width: "90%",
                alignSelf: "center",
                marginBottom: 10,
              }}
              onPress={(item) => setSubscription(item)}
            />
          </DropDown>
          <SubmitButton
            title="REGISTER"
            textStyle={{
              fontWeight: "700",
            }}
          />
        </AppForm>
      </View>
    </Screen>
  );
}

export default CreateHouseHoldScreen;
