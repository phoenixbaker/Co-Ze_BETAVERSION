import { Buffer } from "buffer";

import apiClient from "./client";

// Redo (Maybe profile pictures are own section -- sectionilse more)

const endpoint = "/users";

const getUserDetails = async () => {
  const data = await apiClient.get(endpoint + "/me");
  return data;
};

const validateEmail = async (email, password) => {
  const res = await apiClient.post(endpoint + "/confirmation", {
    password: password,
    email: email,
  });
  return res;
};

const postUser = async (email, password, DOBirth, name) => {
  const data = await apiClient.post(endpoint, {
    email: email,
    password: password,
    name: name,
  });
  return data;
};

const postNotificationToken = async (token) => {
  const data = await apiClient.post(endpoint + "/set/notificationToken", token);
  return data;
};

export { postUser, getUserDetails, validateEmail, postNotificationToken };
