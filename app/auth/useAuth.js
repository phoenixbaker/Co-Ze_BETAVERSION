import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { getHousehold } from "../api/household";
import AuthContext from "./context";
import authStorage from "./storage/token";
import userStorage from "./storage/user";
import { getLocation } from "../api/location";
import { getProfilePicture } from "../api/users";
import ProfilePictureScreen from "../screens/ProfilePictureScreen";

// Redo

export default useAuth = () => {
  const { user, setUser, household, setHousehold, img, setImg } =
    useContext(AuthContext);

  const logOut = () => {
    setUser(null);

    authStorage.removeToken();
  };

  const logIn = async (res) => {
    await setToken(res.headers["x-auth-token"]);
    await setHouseholdStorage(res.data.households[0]);
    await logInUser(res.data);
    await profilePicture();
  };

  const profilePicture = async () => {
    const res = await getProfilePicture();
    userStorage.setImages(res);
    setImg(res);
  };

  const logInUser = async (data) => {
    await userStorage.setUser(data);
    setUser(data);
  };

  const setHouseholdStorage = async (value) => {
    const res = await getHousehold(value);
    if (res.ok) {
      setHousehold(res.data);
    }
  };

  const setToken = async (value) => {
    await authStorage.setToken(value);
  };

  const getHouseholdInfo = async () => {
    const result = await getHousehold(user.households[0]);
    setHousehold(result.data);
    // console.log(household);
  };

  const location = async () => {
    const currentLocation = await getLocation(user._id);
    // user.longitude.push(currentLocation.longitude);
    // user.latitude.push(currentLocation.latitude);
    setUser(currentLocation);
    // console.log(user);
  };

  const newHouseHold = (_id, name) => {
    user.households.push(_id);
    user.households_name.push(name);
    setUser(user);
  };

  return {
    user,
    setUser,
    household,
    logOut,
    logIn,
    newHouseHold,
    location,
    getHouseholdInfo,
    setHousehold,
    household,
    img,
    setImg,
  };
};
