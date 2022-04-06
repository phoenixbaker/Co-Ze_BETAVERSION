import apiClient from "./client";
import * as Location from "expo-location";

const endpoint = "/location";

const endPoint_2 = "/location/household";

const getLocation = async (id) => {
  const { data } = await apiClient.post(endpoint, {
    id: id,
  });
  return data;
};

const updateLocation = async (latitude, longitude, id) => {
  const { data } = await apiClient.put(endpoint, {
    id: id,
    longitude: longitude,
    latitude: latitude,
  });
  // console.log(data);
  return data;
};

const householdLocation = async (lat, lng, id) => {
  const location = await apiClient.put(endPoint_2, {
    household_id: id,
    lat: lat,
    lng: lng,
  });
  // console.log(location);
  return location;
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
