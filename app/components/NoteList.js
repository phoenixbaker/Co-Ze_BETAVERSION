import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ListItemDeleteAction from "../components/ListItemDeleteAction";
import Colours from "../config/Colours";
import ListItem from "./ListItem";
import useAuth from "../auth/useAuth";
import DisplayImage from "./DisplayImage";
import { getProfilePicture } from "../api/profilepicture";
import { deleteNote } from "../api/notes";

function NoteList({
  containerListStyle,
  renderRightActions,
  renderNoNotes,
  imageStyle,
  listStyle,
  titleStyle,
}) {
  const { household, updateHousehold, img, user } = useAuth();
  const [notes, setNotes] = useState(false);
  const [ready, setReady] = useState(false);
  // const [combArr, setCombArr] = useState();

  useEffect(() => {
    handleNotes();
  }, [household, user]);

  const handleNotes = () => {
    setNotes(false);
    household.users.forEach((user, i) => {
      if (!user.notes.length) return;
      setNotes(true);
      return;
    });
    setReady(true);
  };

  const handleDelete = async (note) => {
    const { data } = await deleteNote(note);
    await updateHousehold(data);
    handleNotes();
    return;
  };

  return (
    <>
      <View style={containerListStyle}>
        {ready ? (
          notes ? (
            <FlatList
              data={household.users}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) =>
                item.notes.map((note, id) => (
                  <ListItem
                    containerstyles={listStyle}
                    title={note}
                    JSXImage={<DisplayImage img={img[item._id]} />}
                    imageStyle={imageStyle}
                    titleStyle={titleStyle}
                    subTitle={item.name}
                    subTitleStyle={{
                      textTransform: "capitalize",
                      fontSize: 16,
                    }}
                    renderRightActions={() => (
                      <ListItemDeleteAction
                        onPress={() => handleDelete(note)}
                      />
                    )}
                  />
                ))
              }
            />
          ) : (
            renderNoNotes
          )
        ) : (
          <ActivityIndicator color={Colours.primary} />
        )}
      </View>
    </>
  );
}

export default NoteList;
