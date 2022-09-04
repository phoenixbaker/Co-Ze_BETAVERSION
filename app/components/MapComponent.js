import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getUserLocation } from "./Location";
import DisplayImage from "./DisplayImage";
import useAuth from "../auth/useAuth";
import Colours from "../config/Colours";

export default function MapComponent({
  onPress,
  mapStyle = styles.map,
  onUserSelect,
  onHouseholdSelect,
  shownRegion,
  onRegionChange,
}) {
  const mapViewRef = useRef();
  const { household, user, img, updateUser } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [locations, setLocations] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setInterval(() => {
        getUserLocation();
      }, 10000);
    }
  }, []);

  // console.log(household.users);

  return (
    <>
      <MapView
        onPress={onPress}
        ref={mapViewRef}
        // onRegionChange={() => {
        //   getPosition();
        // }}
        style={[styles.map, mapStyle]}
        initialRegion={shownRegion}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(household.location.latitude, 10),
            longitude: parseFloat(household.location.longitude, 10),
          }}
          onPress={onHouseholdSelect}
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
              onPress={() => onUserSelect(user)}
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
