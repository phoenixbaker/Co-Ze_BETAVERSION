import apiClient from "./client";

const endPoint = "/events";

const postEvent = async (eventName, eventType, details, day, recurs) => {
  const itter = recurs ? handleRecurs(recurs, day) : null;
  console.log(itter);
  if (!itter)
    return await sendEvent(eventName, eventType, details, day, recurs);
  let res;
  for (var i = 0; i < itter.length; i++) {
    res = await sendEvent(eventName, eventType, details, itter[i], recurs);
  }
  return res;
};

const sendEvent = async (eventName, eventType, details, day) => {
  const res = await apiClient.post(endPoint + "/add", {
    eventName,
    eventType,
    details,
    day: {
      dateString: day,
    },
  });
  return res;
};

const handleRecurs = (recurs, day) => {
  let arr;
  if (recurs === "Week") arr = handleDate(day, 1);
  if (recurs === "Fortnite") arr = handleDate(day, 2);
  if (recurs === "Month") arr = handleMonth(day);
  return arr;
};

const handleMonth = (day) => {
  let tempArr = [];
  const eventDate = new Date(day.timeStamp);
  tempArr.push(timeToString(eventDate));
  for (var i = 1; i < 12; i++) {
    let tempDate = eventDate;
    const res = tempDate.setMonth(tempDate.getMonth() + 1);
    tempArr.push(timeToString(res));
  }
  return tempArr;
};

const handleDate = (day, factor) => {
  let tempArr = [];
  const eventDate = new Date(day.timeStamp);
  tempArr.push(timeToString(eventDate));
  for (var i = 1; i < 52 / factor; i++) {
    let tempDate = new Date();
    tempArr.push(
      timeToString(tempDate.setDate(eventDate.getDate() + 7 * i * factor))
    );
  }
  return tempArr;
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export { postEvent };
