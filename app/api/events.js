import apiClient from "./client";

const endPoint = "/events";

const postEvent = async (eventName, eventType, details, day) => {
  const res = await apiClient.post(endPoint + "/add", {
    eventName,
    eventType,
    details,
    day,
  });
  return res;
};

export { postEvent };
