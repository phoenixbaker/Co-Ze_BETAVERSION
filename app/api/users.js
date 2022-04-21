import { Buffer } from "buffer";

import apiClient from "./client";

const endpoint = "/users";

const getUserDetails = async () => {
  const data = await apiClient.post(endpoint + "/me");
  console.log(data);
  return data;
};

const postUser = async (email, password, DOBirth, name) => {
  const data = await apiClient.post(endpoint, {
    email: email,
    password: password,
    DOBirth: DOBirth,
    name: name,
  });
  return data;
};

const getProfilePicture = async () => {
  const data = await apiClient.get("/img/download").then((res) => {
    return new Buffer.from(res.data).toString("base64");
  });
  console.log("Got Profile Picture");
  return data;
};

const uploadProfilePicture = async (formData) => {
  await apiClient.post("/img/upload", formData).then((Response) => {
    console.log(Response);
  });
};

export { postUser, getProfilePicture, uploadProfilePicture, getUserDetails };
