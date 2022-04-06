import React, { useState, useEffect } from "react";
import { Button, Text, FlatList, View } from "react-native";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { postNote } from "../api/notes";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

const validationSchema = Yup.object().shape({
  note: Yup.string(),
});

function FridgeScreen(props) {
  const [Note, setNote] = useState([]);
  const { user, household } = useAuth();

  useEffect(() => {
    setNote(household.notes.note);
    console.log(Note);
    // console.log(household.notes);
    // console.log(Note);
  }, []);

  const uploadNote = async ({ note_upload }) => {
    const result = await postNote(household._id, note_upload, user._id);
    console.log(result.data.notes);
    setNote(result.data.notes.note);
    console.log(Note);
    // console.log("HERE", Note);
  };

  // Fix Structure of Data

  const handleDelete = (message) => {
    setNote(Note.filter((m) => m.note !== message.note));
  };

  return (
    <Screen>
      <FlatList
        data={household.notes}
        keyExtractor={(Note) => Note.toString()}
        renderItem={({ item }) => (
          <ListItem
            renderRightActions={() => (
              <ListItemDeleteAction onPress={handleDelete} />
            )}
            title={item.note}
          />
        )}
      />
      <AppForm
        initialValues={{ note_upload: "" }}
        onSubmit={uploadNote}
        validationSchema={validationSchema}
      >
        <AppFormField name="note_upload" icon="note" placeholder="NOTE" />
        <SubmitButton title="Upload Note" />
      </AppForm>
    </Screen>
  );
}

export default FridgeScreen;
