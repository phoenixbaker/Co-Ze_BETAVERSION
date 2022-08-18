import { TouchableOpacity, View } from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";

export default function SvgIcon({
  onPress,
  sprite,
  seed,
  containerStyle,
  svgHtml,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <SvgUri
        width="90%"
        height="90%"
        uri={
          svgHtml
            ? svgHtml
            : `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`
        }
      />
    </TouchableOpacity>
  );
}
