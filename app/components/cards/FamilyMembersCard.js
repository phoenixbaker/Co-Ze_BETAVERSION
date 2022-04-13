import React, { useEffect } from "react";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

import { getStreetlocation } from "../../api/location";
import { AppFormField, AppForm, SubmitButton } from "../forms";
import useAuth from "../../auth/useAuth";
import Card from "./Card";

const validationSchema = Yup.object().shape({
  homeAddress: Yup.string(),
});

function FamilyMembersCard({ onPress }) {
  let { household, setHousehold } = useAuth();

  const streetLocation = async ({ homeAddress }) => {
    const { data } = await getStreetlocation(homeAddress, household._id);
    setHousehold(data);
  };

  return (
    <Card title="Family Members">
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
          />
        </MapView>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 250,
    width: "100%",
  },
});

export default FamilyMembersCard;
