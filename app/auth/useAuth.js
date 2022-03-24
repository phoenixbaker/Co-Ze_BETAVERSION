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
    if (JSON.stringify(user.households).length === 2) {
      console.log("here");
      navigation.navigate("NewUserDashboard");
    } else {
      navigation.reset({ index: -1, routes: [{ name: "Dashboard" }] });
    }
  };

  return { user, logOut, logIn };
};
