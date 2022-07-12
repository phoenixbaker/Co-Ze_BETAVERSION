import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, Image, View } from "react-native";
import Supercluster from "supercluster";

import { getStreetlocation } from "../../api/location";
import { AppFormField, AppForm, SubmitButton } from "../forms";
import useAuth from "../../auth/useAuth";
import Card from "./Card";
import Colours from "../../config/Colours";
import getLocation from "../Location";
import ClusteredMapView from "react-native-maps-super-cluster";

const validationSchema = Yup.object().shape({
  homeAddress: Yup.string(),
});

function FamilyMembersCard({ onPress }) {
  const { user, household, setHousehold, img } = useAuth();

  getLocation();

  const streetLocation = async ({ homeAddress }) => {
    const { data } = await getStreetlocation(homeAddress, household._id);
    setHousehold(data);
  };

  const displayImage = (img) => {
    return "data:image/png;base64," + img;
  };

  return (
    <Card title="Family Members">
      <Text> Locate Your Family Members!!! </Text>
      <Text></Text>
      <Text>
        {" "}
        Have map centered at household showing family members location{" "}
      </Text>
      <Text> Opt users to add household address </Text>
      {household.longitude === undefined ? (
        <AppForm
          initialValues={{ homeAddrss: null }}
          onSubmit={streetLocation}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="homeAddress"
            icon="home"
            placeholder="ENTER HOME ADDRESS"
          />
          <SubmitButton title="Upload Address" />
        </AppForm>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: household.latitude,
            longitude: household.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: household.latitude,
              longitude: household.longitude,
            }}
          >
            <Image
              source={require("../../assets/co-zy-logo.jpg")}
              style={{ width: 25, height: 25, borderRadius: 20 }}
            />
          </Marker>

          <Marker
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
          >
            <Image
              source={{ uri: displayImage(img) }}
              style={{ width: 25, height: 25, borderRadius: 20 }}
            />
          </Marker>
        </MapView>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 250,
    width: "100%",
    borderColor: Colours.black,
    borderWidth: 1.5,
    borderRadius: 10,
  },
});

export default FamilyMembersCard;
