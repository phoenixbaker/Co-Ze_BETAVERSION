import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, StyleSheet, Platform } from 'react-native';

import updateLocation from '../components/Location';
import Screen from '../components/Screen';
import global from '../config/global';

function LocationScreen(props) {
    global.location = updateLocation();
    console.log(global.location.coords);
    return (
      <Screen>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: global.location.coords.latitude,
            longitude: global.location.coords.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: global.location.coords.latitude,
              longitude: global.location.coords.longitude,
              
            }}
          />
        </MapView>
      </Screen>
    );
}

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%"
    },
})

export default LocationScreen;