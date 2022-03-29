import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = (authToken) => {
    authStorage.setToken(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    console.log(user);
  };

  const newHouseHold = (_id, name) => {
    user.households.push(_id);
    user.households_name.push(name);
    console.log(user);
    setUser(user);
  };

  return { user, logOut, logIn, newHouseHold };
};
