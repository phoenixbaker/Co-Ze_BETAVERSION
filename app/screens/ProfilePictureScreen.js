import React, { useState } from "react";
import {
  Button,
  Image,
  FlatList,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";

import useAuth from "../auth/useAuth";
import AppText from "../config/AppText";
import AppButton from "../components/AppButton";
import ImageInput from "../components/ImageInput";
import Screen from "../components/Screen";
import SvgIcon from "../components/svgIcon";
import Colours from "../config/Colours";
import { postAvatarPicture, postProfilePicture } from "../api/profilepicture";

function ProfilePictureScreen(props) {
  const { user, updateUser, updateUserImage, img } = useAuth();
  const [avatars, setAvatars] = useState([
    { sprite: "adventurer", key: 1 },
    { sprite: "avataaars", key: 2 },
    { sprite: "big-ears", key: 3 },
    { sprite: "big-smile", key: 4 },
    { sprite: "adventurer-neutral", key: 5 },
    { sprite: "micah", key: 6 },
    { sprite: "miniavs", key: 7 },
    { sprite: "open-peeps", key: 8 },
    { sprite: "bottts", key: 9 },
  ]);
  const [imageUri, setImageUri] = useState();
  const [selected, setSelected] = useState({});
  const [randomNum, setRandomNum] = useState(user.name);

  const uploadAvatar = async () => {
    const res = await postAvatarPicture(selected);
    await updateUser(res.data);
    await updateUserImage(res.data.img);
  };

  const uploadPhoto = async () => {
    var formData = new FormData();
    formData.append("photos", {
      name: user._id,
      type: `image/png`,
      uri: imageUri.uri,
    });

    const res = await postProfilePicture(formData, user);
    await updateUser(res.data);
    await updateUserImage(res.data.img);
  };

  const randomNumber = () => {
    if (selected.key !== 0) setSelected({});
    let res = Math.floor(Math.random() * 1000000);
    return setRandomNum(res);
  };

  const selectedUploadedPicture = () => {
    setSelected({
      sprite: "Uploaded Picture",
      key: 0,
    });
  };

  const selectedPicture = (sprite, key) => {
    setSelected({
      sprite: sprite,
      seed: randomNum,
      key: key,
    });
    console.log(selected);
  };

  const uploadImage = async () => {
    if (selected.key === 0) return await uploadPhoto();
    return await uploadAvatar();
    // get the file extension maybe
  };

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Update Your Profile Picture
        </AppText>
      </View>
      <ImageBackground
        source={require("../assets/familyphoto.jpg")}
        blurRadius={6}
        style={styles.imageBackground}
      >
        <Screen style={styles.screenContainer}>
          <View style={{ alignItems: "center" }}>
            <ImageInput
              containerStyles={selected.key === 0 && styles.picContainer}
              onPress={() => selectedUploadedPicture()}
              image={imageUri}
              onChangeImage={(imgUp) => setImageUri(imgUp)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              scrollEnabled={false}
              keyExtractor={(item) => item.key}
              numColumns={3}
              data={avatars}
              renderItem={({ item }) => (
                <SvgIcon
                  sprite={item.sprite}
                  seed={randomNum}
                  containerStyle={
                    item.key === selected.key
                      ? styles.selectedContainer
                      : styles.SvgContainer
                  }
                  onPress={() => selectedPicture(item.sprite, item.key)}
                />
              )}
            />
          </View>
          <View style={{ bottom: 105 }}>
            <AppButton
              text="Refresh Icons"
              onPress={() => randomNumber()}
              buttonStyle={{ width: 300 }}
            />
            <AppButton
              text="Upload Image"
              onPress={() => uploadImage()}
              buttonStyle={styles.uploadButton}
            />
          </View>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    width: 300,
    backgroundColor: "transparent",
    borderColor: Colours.white,
    borderWidth: 2,
  },
  screenContainer: {
    flex: 1,
    margin: 15,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  picContainer: {
    borderWidth: 4,
    borderColor: Colours.primary,
  },
  selectedContainer: {
    margin: 4,
    backgroundColor: Colours.white,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 11,
    borderWidth: 4,
    borderColor: Colours.primary,
  },
  SvgContainer: {
    margin: 4,
    backgroundColor: Colours.white,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colours.darkgray,
  },
});

export default ProfilePictureScreen;
