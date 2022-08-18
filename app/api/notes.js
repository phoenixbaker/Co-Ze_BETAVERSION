import apiClient from "./client";

const endpoint = "/my/notes";

const postNote = async (note_upload) => {
  const note = await apiClient.put(endpoint, {
    note: note_upload,
  });
  return note;
};

const deleteNote = async (note) => {
  const res = await apiClient.put(endpoint + "/delete", {
    note: note,
  });
  return res;
};

const getNotes = async (household_id) => {
  const note = await apiClient.post(endpoint, {
    id: household_id,
  });
  return note;
};

export { postNote, getNotes, deleteNote };
