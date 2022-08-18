import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Colours from "../config/Colours";
import AppButton from "../components/AppButton";

export default function ImageInput({
  image,
  onChangeImage,
  onPress,
  containerStyles,
}) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });
      if (!result.cancelled) {
        onChangeImage(result);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const handlePress = () => {
    onChangeImage(null);
    selectImage();
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity onPress={image ? onPress : handlePress}>
        <View style={[styles.container, containerStyles]}>
          {!image ? (
            <MaterialCommunityIcons
              name="camera"
              color={Colours.mediumgray}
              size={40}
            />
          ) : (
            <Image source={{ uri: image.uri }} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
      <AppButton
        text="^ Upload a Photo ^"
        onPress={handlePress}
        buttonStyle={{ width: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.lightgray,
    borderRadius: 15,
    justifyContent: "center",
    height: 100,
    width: 100,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
