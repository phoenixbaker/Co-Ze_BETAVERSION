import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import AppText from "../config/AppText";

import Colours from "../config/Colours";

function ListItem({
  IconComponent,
  image,
  imageStyle,
  onPress,
  DisableOnPress = false,
  subTitle,
  subTitleStyle,
  containerstyles,
  title,
  titleStyle,
}) {
  if (DisableOnPress) {
    return (
      <TouchableHighlight underlayColor={Colours.lightgray}>
        <View style={[styles.container, containerstyles]}>
          {IconComponent}
          {image && <Image source={image} style={[styles.image, imageStyle]} />}
          <View style={styles.detailContainer}>
            <AppText style={titleStyle}>{title}</AppText>
            {subTitle && <AppText style={subTitleStyle}>{subTitle}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight underlayColor={Colours.lightgray} onPress={onPress}>
      <View style={[styles.container, containerstyles]}>
        {IconComponent}
        {image && <Image source={image} style={[styles.image, imageStyle]} />}
        <View style={styles.detailContainer}>
          <AppText style={titleStyle}>{title}</AppText>
          {subTitle && <AppText style={subTitleStyle}>{subTitle}</AppText>}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
});

export default ListItem;
