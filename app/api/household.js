import apiClient from "./client";

const endPoint = "/household";
const endPoint_2 = "/household/my";

const postHousehold = async (name, location, subscription, id) => {
  const data = await apiClient.post(endPoint, {
    name: name,
    location: location,
    subscription: subscription,
    users: id,
  });
  return data;
};

const removeHousehold = async (id) => {
  const data = await apiClient.delete(endPoint + "/" + id);
  return data;
};

const checkHousholeUpdate = async (household) => {
  const data = await apiClient.post(endPoint + "/check/update", {
    household,
  });
  return data;
};

const getHousehold = async (id) => {
  const data = await apiClient.post(endPoint_2, {
    id: id,
  });
  return data;
};

const joinHouseholdwithCode = async (code) => {
  const res = await apiClient.put(endPoint + "/auth", {
    code: code,
  });
  return res;
};

const getHouseholdCode = async () => {
  return await apiClient.get(endPoint + "/key");
};

const updateSubscription = async (model) => {
  return await apiClient.put(endPoint + `/subscription/update/${model}`);
};

export {
  updateSubscription,
  checkHousholeUpdate,
  postHousehold,
  getHousehold,
  joinHouseholdwithCode,
  getHouseholdCode,
  removeHousehold,
};
