import { Buffer } from "buffer";

import apiClient from "./client";

// Redo (Maybe profile pictures are own section -- sectionilse more)

const endpoint = "/users";

const getUserDetails = async () => {
  const data = await apiClient.post(endpoint + "/me");
  console.log(data);
  return data;
};

const validateEmail = async (token, email) => {
  const res = await apiClient.post(endpoint + "/confirmation", {
    token: token,
    email: email,
  });
  console.log(res.data);
  return res;
};

const postUser = async (email, password, DOBirth, name) => {
  console.log("here");
  const data = await apiClient.post(endpoint, {
    email: email,
    password: password,
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

export {
  postUser,
  getProfilePicture,
  uploadProfilePicture,
  getUserDetails,
  validateEmail,
};
