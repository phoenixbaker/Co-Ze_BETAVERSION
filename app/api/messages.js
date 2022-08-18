import apiClient from "./client";
import { sendNotification } from "./notification";

const endPoint = "/messages";

const postMessage = async (message, user) => {
  const time = Date.now();
  const res = await apiClient.post(endPoint, {
    user: {
      _id: user._id,
      notificationToken: user.notificationToken,
    },
    message,
    time,
  });

  return res;
};

const deleteMessage = async (message, id) => {
  const res = await apiClient.put(endPoint + "/delete", {
    message,
    id,
  });
  return res;
};

export { postMessage, deleteMessage };
