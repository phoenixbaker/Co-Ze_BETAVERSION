import apiClient from "./client";
import * as Location from "expo-location";

// Redo

const endpoint = "/location";

const endPoint_2 = "/location/household";

const getLocation = async () => {
  const res = await apiClient.get(endpoint);
  return res;
};

const updateLocation = async (coords) => {
  const res = await apiClient.put(endpoint, {
    coords: coords,
  });
  return res;
};

const householdLocation = async (lat, lng, id) => {
  const res = await apiClient.put(endPoint_2, {
    household_id: id,
    lat: lat,
    lng: lng,
  });
  return res;
};

const getLngLatLocation = async (lat, lng) => {
  const key = "AIzaSyATEBfaQP2w30frpQ-DTvvtLP-TyvNLsEg";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  const result = await apiClient.get(url);
  return result;
};

const getStreetlocation = async (homeAddress, household_id) => {
  try {
    // let homeAddress = "27 Colston Street Ryde"
    let location = await Location.geocodeAsync(homeAddress).then(
      async (Response) =>
        await householdLocation(
          Response[0].latitude,
          Response[0].longitude,
          household_id
        )
    );
    return location;
  } catch (error) {
    console.warn(error);
  }
};

export { updateLocation, getLocation, getLngLatLocation, getStreetlocation };
