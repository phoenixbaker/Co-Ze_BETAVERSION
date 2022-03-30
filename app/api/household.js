import apiClient from "./client";

const endPoint = "/household";
const endPoint_2 = "/household/my";

const postHousehold = async (name, id) => {
  console.log("here");
  const data = await apiClient.post(endPoint, {
    name: name,
    users: id,
  });
  return data;
};

const getHousehold = async (id) => {
  const data = await apiClient.post(endPoint_2, {
    id: id,
  });
  return data;
};

export { postHousehold, getHousehold };
