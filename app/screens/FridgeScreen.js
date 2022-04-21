import React, { useState, useEffect } from "react";
import { Button, Text, FlatList, View, StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { postNote } from "../api/notes";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import NoteList from "../components/NoteList";

const validationSchema = Yup.object().shape({
  note: Yup.string(),
});

function FridgeScreen(props) {
  const [Note, setNote] = useState([]);
  const { user, household } = useAuth();

  useEffect(() => {
    setNote(household.notes);
  }, []);

  const uploadNote = async ({ note_upload }) => {
    const result = await postNote(household._id, note_upload, user.img_id);
    setNote(result.data.notes);
    // console.log("HERE", Note);
  };

  // Fix Structure of Data

  return (
    <Screen>
      <NoteList
        note={household.notes.note}
        icon={household.notes.user_img_id}
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

const styles = StyleSheet.create({});

export default FridgeScreen;
