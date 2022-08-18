import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getUserLocation } from "./Location";
import DisplayImage from "./DisplayImage";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";
import familyImageStorage from "../auth/storage/familyAvatar";

export default function MapComponent() {
  const myRef = useRef();
  const { household, user, img, updateUser } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [locations, setLocations] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setInterval(() => getUserLocation(), 10000);
    }
  }, []);

  // console.log(household.users);

  return (
    <>
      <MapView
        ref={myRef}
        // onRegionChange={() => {
        //   getPosition();
        // }}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(household.location.latitude, 10),
          longitude: parseFloat(household.location.longitude, 10),
          latitudeDelta: 0.15,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(household.location.latitude, 10),
            longitude: parseFloat(household.location.longitude, 10),
          }}
          title={household.name}
          style={{ alignContent: "center" }}
        >
          <Image
            source={require("../assets/co-zy-logo.jpg")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Marker>
        {household.users.map((user, i) => {
          if (!user.location) return;
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(user.location.latitude, 10),
                longitude: parseFloat(user.location.longitude, 10),
              }}
              title={user.name}
            >
              <DisplayImage
                img={img[user._id]}
                imageStyle={{ width: 30, height: 30 }}
              />
            </Marker>
          );
        })}
        {/* {user.location != undefined && (
          <Marker
            coordinate={{
              latitude: user.location.latitude,
              longitude: user.location.longitude,
            }}
            title={user.name}
            description={JSON.stringify(user.location.speed)}
          >
            <DisplayImage img={img} imageStyle={{ width: 30, height: 30 }} />
          </Marker>
        )} */}
      </MapView>
    </>
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
