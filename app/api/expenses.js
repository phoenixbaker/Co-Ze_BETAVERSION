import apiClient from "./client";
import { postEvent } from "./events";

const endPoint = "/expenses";

const postExpense = async (title, value, date, recurs, details) => {
  await apiClient.post(endPoint, {
    title,
    value,
    date: date.dateString,
    recurs,
    details,
  });
  return await postEvent(title, title, details, date, recurs);
};

const removeExpense = async (item) => {
  console.log(item);
  const res = await apiClient.post(endPoint + "/delete", {
    title: item.title,
    value: item.value,
    date: item.when.dateString,
    recurs: item.when.recurs,
    details: item.details,
  });
  //   const res = await apiClient.post(endPoint + "/delete", {
  //     index,
  //   });
  return res;
};

export { postExpense, removeExpense };
