import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, StyleSheet, Platform } from "react-native";

import updateLocation from "../components/Location";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";

function LocationScreen(props) {
  const [currentLocation, setCurrentLocation] = useState();
  const { user, location, household } = useAuth();

  // useEffect(() => {
  //   location();
  // }, []);

  return (
    <Screen>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: household.longitude,
          longitude: household.latitude,
          latitudeDelta: 0.15,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: household.longitude,
            longitude: household.latitude,
          }}
        />
      </MapView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});

export default LocationScreen;
