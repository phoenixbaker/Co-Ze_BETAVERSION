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

export { updateLocation, getLocation };
