import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import Colours from "../config/Colours";
import AppButton from "../components/AppButton";
import useAuth from "../auth/useAuth";
import { postStoryPicture } from "../api/profilepicture";
import { useSharedValue } from "react-native-reanimated";

export default function AddStoryScreen() {
  let cameraRef = useRef();
  const [hasMediaPermission, setHasMediaPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { user, updateHousehold } = useAuth();

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
      autiFocus: true,
      ratio: "4:3",
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const handleDelete = () => {
    setPhoto(null);
  };

  const handleUpload = async () => {
    var formData = new FormData();
    formData.append("stories", {
      name: user._id,
      type: "image/png",
      uri: photo.uri,
    });

    const res = await postStoryPicture(formData);
    await updateHousehold(res.data);
    setPhoto(null);
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.value;
      console.log(scale);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  if (photo) {
    return (
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={pinchGesture}>
          <View>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: "data:image/png;base64," + photo.base64,
              }}
            />
            <View
              style={{
                bottom: 325,
                width: "90%",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <AppButton
                text="Upload"
                buttonStyle={{
                  alignSelf: "center",
                  backgroundColor: "transparent",
                  borderWidth: 3,
                  borderColor: Colours.primary,
                }}
                onPress={() => handleUpload()}
              />
              <AppButton
                text="Delete"
                buttonStyle={{ backgroundColor: Colours.secondary }}
                onPress={() => handleDelete()}
              />
            </View>
          </View>
        </GestureDetector>
      </View>
    );
  }

  const handleFlip = () => {
    if (type === Camera.Constants.Type.back)
      return setType(Camera.Constants.Type.front);
    return setType(Camera.Constants.Type.back);
  };

  const handleMedia = async () => {
    console.log("here");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) return setPhoto(result);
  };

  return (
    <GestureDetector gesture={pinchGesture}>
      <Camera
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        ref={cameraRef}
        type={type}
        zoom={scale}
      >
        <View
          style={{
            width: "100%",
            margin: 80,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ borderRadius: 100, backgroundColor: Colours.secondary }}
            onPress={() => handleFlip()}
          >
            {/* <Button title="Flip Camera" onPress={() => handleFlip()} /> */}

            <Ionicons
              name="md-camera-reverse-outline"
              size={50}
              style={{
                padding: 7,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              backgroundColor: Colours.gray,
              borderRadius: 45,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => takePic()}
          >
            <View
              style={{
                width: "90%",
                height: "90%",
                backgroundColor: Colours.primary,
                borderRadius: 45,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderRadius: 100, backgroundColor: Colours.secondary }}
            onPress={handleMedia}
          >
            <MaterialIcons
              name="perm-media"
              size={45}
              style={{
                padding: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({});
