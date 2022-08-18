import apiClient from "./client";

const endPoint = "/household";
const endPoint_2 = "/household/my";

const postHousehold = async (name, id) => {
  const data = await apiClient.post(endPoint, {
    name: name,
    users: id,
  });
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

export {
  checkHousholeUpdate,
  postHousehold,
  getHousehold,
  joinHouseholdwithCode,
  getHouseholdCode,
};
