import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, StyleSheet, Platform } from 'react-native';

import getLocation from '../components/Location';
import Screen from '../components/Screen';

function LocationScreen(props) {
    let location = getLocation();
    return (
        <Screen>
            {location != false &&
            <MapView 
            style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
            >
                <Marker 
                style={styles.marker}
                coordinate= {{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
                icon={require("../assets/ProfilePicture.jpg")}
                />
                
                </MapView>
            }
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