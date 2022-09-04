import {
  FlatList,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import useAuth from "../auth/useAuth";
import React, { useEffect, useState } from "react";
import Colours from "../config/Colours";
import DisplayImage from "./DisplayImage";

export default function StoryReel() {
  const { household, stories, img, user } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [users, setUsers] = useState(household.users);

  const navigation = useNavigation();

  useEffect(() => {
    handleSortUsers();
  }, [household.users, users.stories]);

  useEffect(() => {
    console.log(household);
    handleSortUsers();
  }, []);

  const handleSortUsers = () => {
    users.forEach((item, i) => {
      if (item._id === user._id) {
        users.splice(i, 1);
        users.unshift(item);
      }
    });
    setIsReady(true);
  };

  if (!isReady) {
    return <ActivityIndicator color={Colours.primary} />;
  }

  const handleStory = async () => {
    let { granted } = await Camera.getCameraPermissionsAsync();
    if (!granted) {
      let { granted } = await Camera.requestCameraPermissionsAsync();
      if (!granted) return console.log("Make smnthn for rejection");
    }
    return navigation.navigate("uploadStory");
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item._id === user._id && !item.stories.length) {
            return (
              <TouchableOpacity onPress={() => handleStory()}>
                <View style={{ marginRight: 25 }}>
                  <DisplayImage
                    img={img[item._id]}
                    imageStyle={styles.noStory}
                  />
                </View>
              </TouchableOpacity>
            );
          }
          if (item._id === user._id) {
            return (
              <>
                <TouchableOpacity onPress={() => handleStory()}>
                  <View style={{ marginRight: 25 }}>
                    <ImageBackground
                      source={{ uri: stories[item._id].img }}
                      style={{ width: 70, height: 70 }}
                      imageStyle={styles.image}
                    >
                      <DisplayImage
                        img={img[item._id]}
                        imageStyle={{
                          width: 35,
                          height: 35,
                          borderWidth: 1,
                          bottom: 0,
                        }}
                      />
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </>
            );
          }
          if (!item.stories.length)
            return (
              <TouchableOpacity onPress={() => console.log("here")}>
                <View style={{ marginRight: 25 }}>
                  <DisplayImage
                    img={img[item._id]}
                    imageStyle={styles.noStory}
                  />
                </View>
              </TouchableOpacity>
            );
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("displayStory", {
                    selectedUser: item,
                  })
                }
              >
                <View style={{ marginRight: 25 }}>
                  <ImageBackground
                    source={{ uri: stories[item._id].img }}
                    style={{ width: 70, height: 70 }}
                    imageStyle={styles.image}
                  >
                    <DisplayImage
                      img={img[item._id]}
                      imageStyle={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        bottom: 0,
                      }}
                    />
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 25,
    borderWidth: 2,
    borderColor: Colours.primary,
  },
  noStory: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 25,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: Colours.gray,
  },
  container: {
    justifyContent: "center",
    backgroundColor: Colours.lightgray,
    margin: 12,
    flexDirection: "row",
    marginHorizontal: 20,
    marginRight: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
