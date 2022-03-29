import apiClient from "./client";

const endpoint = "/my/notes";

const postNote = async (household_id, note_upload) => {
  const note = await apiClient.put(endpoint, {
    id: household_id,
    note: note_upload,
  });
  return note;
};

const getNotes = async (household_id) => {
  const note = await apiClient.post(endpoint, {
    id: household_id,
  });
  return note;
};

export { postNote, getNotes };
