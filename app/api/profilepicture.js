import apiClient from "./client";

const endpoint = "/img";

const postAvatarPicture = async (avatar) => {
  const uri = `https://avatars.dicebear.com/api/${avatar.sprite}/${avatar.seed}.svg`;
  const res = await apiClient.post(endpoint + "/avatar", {
    avatarHtml: uri,
  });
  return res;
};

const postProfilePicture = async (formData, user) => {
  if (user.img !== undefined && user.img.length === 24) {
    await apiClient.post(endpoint + "/delete", { _id: user.img });
  }
  const res = await apiClient.post(endpoint + "/me", formData, {
    "content-type": "multipart/form-data",
  });
  if (!res.ok) console.warn(res);
  return res;
};

const getProfilePicture = async (id) => {
  const res = await apiClient.get(endpoint + "/my/" + id);
  return res;
};

const getStoryPicture = async (id) => {
  const res = await apiClient.get(endpoint + "/story/" + id);
  if (!res.ok) return console.warn(res.problem);
  return res;
};

const postStoryPicture = async (formData) => {
  const res = await apiClient.post(endpoint + "/household/stories", formData, {
    "content-type": "multipart/form-data",
  });
  if (!res.ok) console.warn(res.problem);
  return res;
};

export {
  postProfilePicture,
  postAvatarPicture,
  postStoryPicture,
  getProfilePicture,
  getStoryPicture,
};
