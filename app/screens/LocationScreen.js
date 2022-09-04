import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Text,
  StyleSheet,
  Platform,
  View,
  FlatList,
  ScrollView,
} from "react-native";

import AppText from "../config/AppText";
import updateLocation from "../components/Location";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import MapComponent from "../components/MapComponent";
import Colours from "../config/Colours";
import ListItem from "../components/ListItem";
import DisplayImage from "../components/DisplayImage";

function LocationScreen(props) {
  const [userSelected, setUserSelected] = useState();
  const [showHousehold, setShowHousehold] = useState(false);
  const { user, household, img } = useAuth();
  const [renderItem, setRenderItem] = useState();
  const [initialRegion, setInitialRegion] = useState({
    latitude: parseFloat(household.location.latitude, 10),
    longitude: parseFloat(household.location.longitude, 10),
    latitudeDelta: 0.15,
    longitudeDelta: 0.0121,
  });

  const handleMarkerPress = (user, mapViewRef) => {
    console.log(mapViewRef);
    setShowHousehold(true);
    setUserSelected(user);
    setRenderItem(
      <View>
        <ListItem
          title={user.name}
          JSXImage={<DisplayImage img={img[user._id]} />}
          onPress={() => setShowHousehold(false)}
        />
      </View>
    );
    setInitialRegion({
      latitude: parseFloat(user.location.latitude, 10),
      longitude: parseFloat(user.location.longitude, 10),
      latitudeDelta: 0.15,
      longitudeDelta: 0.0121,
    });
    console.log(initialRegion);
  };

  const handleData = () => {
    const data = household.users;
    return data;
  };

  const handleHouseholdPress = () => {
    setRenderItem(
      <View>
        <ListItem
          title={household.name}
          onPress={() => setShowHousehold(false)}
          image={require("../assets/co-zy-logo2.jpg")}
        />
      </View>
    );
    setShowHousehold(true);
  };

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Locations
        </AppText>
      </View>
      <Screen>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <MapComponent
            mapStyle={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
              flex: 0.7,
              borderRadius: 0,
            }}
            shownRegion={initialRegion}
            onUserSelect={(user, mapViewRef) =>
              handleMarkerPress(user, mapViewRef)
            }
            onHouseholdSelect={handleHouseholdPress}
          />
          <View
            style={{
              flex: showHousehold ? 0.5 : 0.4,
              alignSelf: "center",
              width: "100%",
              backgroundColor: Colours.titleCardGray,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: Colours.secondary,
            }}
          >
            {showHousehold ? (
              renderItem
            ) : (
              <ScrollView>
                {household.users.map((user, id) => {
                  return (
                    <ListItem
                      title={user.name}
                      onPress={() => handleMarkerPress(user)}
                      JSXImage={<DisplayImage img={img[user._id]} />}
                    />
                  );
                })}
                <ListItem
                  title={household.name}
                  onPress={handleHouseholdPress}
                  image={require("../assets/co-zy-logo2.jpg")}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default LocationScreen;
