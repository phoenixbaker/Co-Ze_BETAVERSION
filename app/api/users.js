import apiClient from "./client";

const endpoint = "/users";

const postUser = async (email, password, DOBirth, name) => {
  const {data} = await apiClient.post(endpoint, 
    {
      email: email,
      password: password,
      DOBirth: DOBirth,
      name: name
  });
  return data;
};

export default postUser;