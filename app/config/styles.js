import { Platform } from "react-native";

import Colours from "./Colours";

export default {
  Colours,
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: Colours.darkgray,
  },
};
