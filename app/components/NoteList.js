import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import ListItemDeleteAction from "../components/ListItemDeleteAction";
import { getProfilePicture } from "../api/users";
import Colours from "../config/Colours";
import ListItem from "./ListItem";

function NoteList({
  note,
  icon,
  renderRightActions,
  containerListStyle,
  noteListStyle,
  imageStyle,
}) {
  const [ready, setReady] = useState(false);
  const [combArr, setCombArr] = useState();
  useEffect(() => {
    combination(note, icon);
  }, []);

  const handleDelete = (message) => {
    setNote(Note.filter((m) => m.note !== message.note));
  };

  const combination = async (note, icon) => {
    const comb = [[]];
    const imgArr = [];
    icon.forEach(async (name, i) => {
      await getProfilePicture().then((Response) => {
        const data = Response;
        imgArr.push("data:image/png;base64," + data);
        if (imgArr.length === note.length) {
          for (let i in note) {
            comb.push([note[i], imgArr[i]]);
          }
          comb.shift();
          if (comb === combArr) return;
          setCombArr(comb);
          setReady(true);
        }
      });
    });
  };

  return (
    <View style={containerListStyle}>
      {ready ? (
        <>
          {combArr.map(function (val, i) {
            return (
              <ListItem
                renderRightActions={() => (
                  <ListItemDeleteAction onPress={handleDelete} />
                )}
                title={combArr[i][0]}
                imageStyle={imageStyle}
                image={{ uri: combArr[i][1] }}
                containerstyles={noteListStyle}
              />
            );
          })}
        </>
      ) : (
        <ActivityIndicator color={Colours.primary} size="large" />
      )}
    </View>
  );
}

export default NoteList;
