import apiClient from "./client";

const endPoint = "/household";

const postHousehold = async (name, id) => {
  console.log(id);
  const data = await apiClient.post(endPoint, {
    name: name,
    users: id,
  });
  return data;
};

export default postHousehold;
