import React, { useState } from "react";
import { Button } from "react-native";
import { uploadProfilePicture } from "../api/users";
import ImageInput from "../components/ImageInput";
import Screen from "../components/Screen";

function ProfilePictureScreen(props) {
  const [imageUri, setImageUri] = useState();

  const uploadImage = async (imageUri) => {
    const uri = imageUri.uri;
    const formData = new FormData();
    formData.append("img", {
      name: new Date() + "_profile",
      uri: uri,
      type: "image/jpeg",
    });
    await uploadProfilePicture(formData);
  };

  return (
    <Screen>
      <ImageInput image={imageUri} onChangeImage={(uri) => setImageUri(uri)} />
      <Button title="Upload" onPress={() => uploadImage(imageUri)} />
    </Screen>
  );
}

export default ProfilePictureScreen;
