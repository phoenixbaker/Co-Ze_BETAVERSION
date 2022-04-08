import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { getProfilePicture } from "../api/users";
import ListItem from "./ListItem";

function NoteList({
  note,
  icon,
  containerListStyle,
  noteListStyle,
  imageStyle,
}) {
  const [ready, setReady] = useState(false);
  const [combArr, setCombArr] = useState();
  useEffect(() => {
    combination(note, icon);
  }, []);

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
      {ready && (
        <>
          {combArr.map(function (val, i) {
            return (
              <ListItem
                title={combArr[i][0]}
                imageStyle={imageStyle}
                image={{ uri: combArr[i][1] }}
                containerstyles={noteListStyle}
              />
            );
          })}
        </>
      )}
    </View>
  );
}

export default NoteList;
