import React, { useEffect, useState } from "react";

import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import { View } from "react-native";

// [i] Expenses dynamic bar

// [t] Calender for Upcoming Events

// [t] Fix backend events, DOBirth

// [] Add middleware or smnthn to check if image has changed so server doesn't overload on req

// [x] DeepLinking

// [x] Redo navigation ugh

// [i] Subscription

// [i] finalize styling

// [] Make sure Deeplinking works with expo publish / app store

// [] Add guide at start

// const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";

// TaskManager.defineTask(
//   TASK_FETCH_LOCATION,
//   async ({ data: { locations }, error }) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     const [location] = locations;
//     try {
//       console.log(location);
//       // const url = `https://<your-api-endpoint>`;
//       // await axios.post(url, { location }); // you should use post instead of get to persist data on the backend
//     } catch (err) {
//       // console.error(err);
//     }
//   }
// );

// Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
//   accuracy: Location.Accuracy.Highest,
//   distanceInterval: 1, // minimum change (in meters) betweens updates
//   deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
//   // foregroundService is how you get the task to be updated as often as would be if the app was open
//   foregroundService: {
//     notificationTitle: "Using your location",
//     notificationBody:
//       "To turn off, go back to the app and switch something off.",
//   },
// });

// Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
//   if (value) {
//     Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
//   }
// });

export default function App(props) {
  const [user, setUser] = useState();
  const [household, setHousehold] = useState();
  const [img, setImg] = useState({});
  const [stories, setStories] = useState({});
  const [householdLinkID, setHouseholdLinkID] = useState();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        household,
        setHousehold,
        img,
        setImg,
        stories,
        setStories,
        householdLinkID,
        setHouseholdLinkID,
      }}
    >
      {/* Make Offline */}
      <AppNavigator />
    </AuthContext.Provider>
  );
}
