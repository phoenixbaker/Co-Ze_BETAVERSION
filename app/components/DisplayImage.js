import { StyleSheet, Image, View } from "react-native";
import React from "react";
import SvgIcon from "./svgIcon";
import Colours from "../config/Colours";

export default function DisplayImage({ img, imageStyle }) {
  return (
    <View>
      {img.type === "base64" ? (
        <Image source={{ uri: img.img }} style={[styles.image, imageStyle]} />
      ) : (
        <SvgIcon
          svgHtml={img.img}
          containerStyle={[styles.SvgImage, imageStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  SvgImage: {
    marginRight: 10,
    backgroundColor: Colours.white,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colours.darkgray,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },
});
