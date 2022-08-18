import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import useAuth from "../auth/useAuth";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DisplayStoryScreen({ route }) {
  const { selectedUser } = route.params;
  const { stories } = useAuth();

  return (
    <TouchableOpacity>
      <Image
        source={{ uri: stories[selectedUser._id].img }}
        style={{ height: "100%", width: "100%" }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
