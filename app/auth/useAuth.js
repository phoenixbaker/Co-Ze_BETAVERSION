import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { getHousehold } from "../api/household";
import AuthContext from "./context";
import authStorage from "./storage";
import { getLocation } from "../api/location";
import { getProfilePicture } from "../api/users";

export default useAuth = () => {
  const { user, setUser, household, setHousehold, img, setImg } =
    useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = async (authToken) => {
    authStorage.setToken(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    if (img === undefined) {
      await getProfilePicture().then((Response) => {
        setImg(Response);
      });
    }
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
