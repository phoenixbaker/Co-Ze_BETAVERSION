import React, { useState, useEffect } from "react";
import { Button, Text, FlatList } from "react-native";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { postNote } from "../api/notes";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  note: Yup.string(),
});

function FridgeScreen(props) {
  const [Note, setNote] = useState([]);
  const { user, household } = useAuth();

  useEffect(() => {
    setNote(household.notes);
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

  return (
    <Screen>
      <FlatList
        data={Note}
        keyExtractor={(Note) => Note.toString()}
        renderItem={({ item }) => <ListItem title={item} />}
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
