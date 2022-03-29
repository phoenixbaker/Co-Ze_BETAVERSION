import React, { useState } from "react";
import { Button, Text, FlatList } from "react-native";
import * as Yup from "yup";

import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { postNote } from "../api/notes";
import useAuth from "../hooks/auth/useAuth";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  note: Yup.string(),
});

function FridgeScreen(props) {
  const [note, setNote] = useState([]);
  const { user } = useAuth();

  console.log(user);
  const uploadNote = async ({ note_upload }) => {
    console.log("Here");
    const result = await postNote(user.households[0], note_upload);
    setNote(result.data);
  };

  return (
    <Screen>
      <FlatList
        data={note}
        keyExtractor={(note) => note.toString()}
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
