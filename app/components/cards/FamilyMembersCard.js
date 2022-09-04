import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Placesearch from "react-native-placesearch";

import { getStreetlocation, householdLocation } from "../../api/location";
import { AppFormField, AppForm, SubmitButton } from "../forms";
import useAuth from "../../auth/useAuth";
import Card from "./Card";
import Colours from "../../config/Colours";
import MapComponent from "../MapComponent";
import ListItem from "../ListItem";

const validationSchema = Yup.object().shape({
  homeAddress: Yup.string(),
});

function FamilyMembersCard({ onPress }) {
  const { user, household, updateHousehold, img, updateUser } = useAuth();
  const [input, setInput] = useState();
  const [data, setData] = useState([]);

  const streetLocation = async ({ homeAddress }) => {
    const { data } = await getStreetlocation(homeAddress, household._id);
    updateHousehold(data);
  };

  const onChangeText = async (text) => {
    setInput(text);
    await searchAddress(text);
  };

  const searchAddress = async (address) => {
    if (address.length < 3) return setData([]);
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
      if (input[i] === " ") return temp;
      temp += input[i];
    }
  };

  return (
    <Card title="Family Members" onPress={onPress}>
      {!household.location ? (
        <View>
          <AppForm
            initialValues={{ homeAddrss: null }}
            onSubmit={streetLocation}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="homeAddress"
              icon="home"
              placeholder="ENTER HOME ADDRESS"
              inputStyle={{ borderWidth: 2, borderColor: Colours.primary }}
              onChange={onChangeText}
            />
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                if (item.type !== "house" && item.type !== "residential")
                  return;

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
                            onPress: async () => {
                              const res = await householdLocation(
                                item.lat,
                                item.lon,
                                household._id
                              );
                              console.log(res);
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
            <SubmitButton title="Upload Address" />
          </AppForm>
        </View>
      ) : (
        <MapComponent
          onPress={onPress}
          shownRegion={{
            latitude: parseFloat(household.location.latitude, 10),
            longitude: parseFloat(household.location.longitude, 10),
            latitudeDelta: 0.15,
            longitudeDelta: 0.0121,
          }}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({});

export default FamilyMembersCard;
