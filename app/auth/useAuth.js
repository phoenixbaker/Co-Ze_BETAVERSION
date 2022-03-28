import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import { useNavigation } from "@react-navigation/native";

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
    console.log(JSON.stringify(user.households).length);
  };

  return { user, logOut, logIn };
};
