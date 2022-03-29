import apiClient from "./client";

const endPoint = "/household";

const postHousehold = async (name, id) => {
  console.log("here");
  const data = await apiClient.post(endPoint, {
    name: name,
    users: id,
  });
  console.log(data.data);
  return data;
};

export default postHousehold;
