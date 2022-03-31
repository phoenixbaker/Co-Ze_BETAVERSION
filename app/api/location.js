import apiClient from "./client";

const endpoint = "/location";

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
  console.log(data);
  return data;
};

const getStreetLocation = async () => {
  const key = "AIzaSyCVskczAH4APorEGY5sNCyrTWVJPpC3u6k";
  const lat = -33.808578;
  const lng = 151.10339;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
  const result = await apiClient.get(url);
  console.log(result.data);
};

export { updateLocation, getLocation, getStreetLocation };
