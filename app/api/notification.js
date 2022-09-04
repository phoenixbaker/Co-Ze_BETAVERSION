import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://exp.host/--/api/v2/push",
  headers: {
    Accept: "application/json",
    "Accept-encoding": "gzip, deflate",
    "Content-Type": "application/json",
  },
});

const sendHouseholdNotification = (users, title, message) => {
  users.forEach((user) => {
    console.log(user);
    const body = {
      to: user.notificationToken.data,
      sound: "default",
      title: title,
      body: message,
    };
    apiClient.post("/send", JSON.stringify(body));
  });
  return;
};

const sendNotification = async (token, user, message) => {
  const body = {
    to: token,
    sound: "default",
    title: user.name,
    body: message,
  };

  await apiClient.post("/send", JSON.stringify(body));
  return;
};

export { sendNotification, sendHouseholdNotification };
