import apiClient from "./client";

const endPoint = "/auth";

const fetchAuth = async (email, password) => {
  const data = await apiClient.post(endPoint, {
    email: email,
    password: password,
  });
  return data;
};

const fetchValidation = async (email, password) => {
  const data = await apiClient.post(endPoint + "/validate", {
    email: email,
    password: password,
  });
  return data;
};

export { fetchAuth, fetchValidation };
