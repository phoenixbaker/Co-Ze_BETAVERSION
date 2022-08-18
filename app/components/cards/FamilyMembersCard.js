import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, Image, View } from "react-native";

import { getStreetlocation } from "../../api/location";
import { AppFormField, AppForm, SubmitButton } from "../forms";
import useAuth from "../../auth/useAuth";
import Card from "./Card";
import Colours from "../../config/Colours";
import MapComponent from "../MapComponent";

const validationSchema = Yup.object().shape({
  homeAddress: Yup.string(),
});

function FamilyMembersCard({ onPress }) {
  const { user, household, updateHousehold, img, updateUser } = useAuth();

  // const [x, setX] = useState();
  // const [y, setY] = useState();

  // const getPosition = () => {
  //   const res = myRef.current.__lastRegion;
  //   // const res = myRef.current.marker;
  //   setX(x);

  //   const y = myRef.current.offsetTop;
  //   setY(y);

  //   console.log(res);
  // };

  const streetLocation = async ({ homeAddress }) => {
    const { data } = await getStreetlocation(homeAddress, household._id);
    updateHousehold(data);
  };

  return (
    <Card title="Family Members">
      {!household.location ? (
        <>
          <Text> Style Address pompt so green border around enter section</Text>
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
            />
            <SubmitButton title="Upload Address" />
          </AppForm>
        </>
      ) : (
        <MapComponent />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({});

export default FamilyMembersCard;
