import apiClient from "./client";

const endpoint = "/users";

const endpoint_2 = "/users/download";

const postUser = async (email, password, DOBirth, name) => {
  const data = await apiClient.post(endpoint, {
    email: email,
    password: password,
    DOBirth: DOBirth,
    name: name,
  });
  return data;
};

const getProfilePicture = async (_id) => {
  const data = await apiClient.get(endpoint_2 + "/" + _id);
  return data;
};

export { postUser, getProfilePicture };
