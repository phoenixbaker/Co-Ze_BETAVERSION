import React, { useState } from "react";
import { Button, Text, FlatList, View, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { postNote } from "../api/notes";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import NoteList from "../components/NoteList";
import Colours from "../config/Colours";

const validationSchema = Yup.object().shape({
  note: Yup.string(),
});

function FridgeScreen(props) {
  const { user, household, updateHousehold } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const uploadNote = async ({ note_upload }) => {
    const result = await postNote(note_upload);
    await updateHousehold(result.data);
  };

  // Fix Structure of Data

  return (
    <Screen>
      <View style={{ height: "100%", justifyContent: "space-between" }}>
        <NoteList
          renderRightActions={() => (
            <ListItemDeleteAction onPress={handleDelete} />
          )}
        />
        <View
          style={{
            flex: 1,
            justifyContent: isVisible ? "flex-start" : "flex-end",
            alignSelf: "center",
            width: "90%",
          }}
        >
          <AppForm
            initialValues={{ note_upload: "" }}
            onSubmit={uploadNote}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="note_upload"
              icon="note"
              placeholder="NOTE"
              onFocus={() => setIsVisible(true)}
              onBlur={() => setIsVisible(false)}
            />
            <SubmitButton title="Upload Note" />
          </AppForm>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default FridgeScreen;
