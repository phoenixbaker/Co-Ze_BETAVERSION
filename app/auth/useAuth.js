import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage/token";
import userStorage from "./storage/user";
import imageStorage from "./storage/images";
import { getProfilePicture, getStoryPicture } from "../api/profilepicture";
import { getHousehold } from "../api/household";
import { getUserDetails } from "../api/users";

export default useAuth = () => {
  const {
    user,
    setUser,
    household,
    setHousehold,
    img,
    setImg,
    stories,
    setStories,
    householdLinkID,
    setHouseholdLinkID,
  } = useContext(AuthContext);

  const logOut = async () => {
    await userStorage.removeUser();
    setHouseholdLinkID(null);
    await setUser(null);

    await authStorage.removeToken();

    setStories({});

    await setImg({});
  };

  const getAuthToken = async () => {
    const res = await authStorage.getToken();
    return res;
  };

  const logIn = async (user, authToken) => {
    await updateAuthToken(authToken);

    const data = await updateHousehold(user.households[0]);

    await updateImages(data);

    await updateUser(user);
    return;
  };

  const updateUserStories = async (user) => {
    if (!user.stories.length) return;
    let stories = user.stories;
    const { data } = await getStoryPicture(user.stories[0]);
    await setStories((story) => ({
      ...story,
      [user._id]: {
        id: user.stories[0],
        img: "data:image/png;base64," + data,
      },
    }));
    return;
  };

  const updateUserImage = async (user) => {
    if (!user.img) return;
    let image = user.img;
    if (image.type === "html") {
      return await setImg((img) => ({
        ...img,
        [user._id]: {
          type: "html",
          id: image.id,
          img: image.id,
        },
      }));
    }

    const { data } = await getProfilePicture(user.img.id);
    await setImg((img) => ({
      ...img,
      [user._id]: {
        type: "base64",
        id: image.id,
        img: "data:image/png;base64," + data,
      },
    }));
    return;
  };

  const updateAuthToken = async (authToken) => {
    await authStorage.setToken(authToken);
    return;
  };

  const updateUser = async (user) => {
    console.log("update user here");
    const { data } = await getUserDetails();
    await setUser(data);
    await userStorage.setUser(data);
  };

  const updateHousehold = async (household) => {
    if (!household) return;

    console.log("update Household");
    let res;
    if (household.length === 24) res = await getHousehold(household);
    else res = await getHousehold(household._id);
    await setHousehold(res.data);
    return res.data;
  };

  const updateImages = async (household) => {
    if (!household) return;
    await setImg({});
    await setStories({});
    await Promise.all(
      household.users.map(async (user) => {
        await updateUserImage(user);
        await updateUserStories(user);
      })
    );

    console.log("finished storing images");
    return;
  };

  const restoreUser = async () => {
    const user = await userStorage.getUser();
    if (user) updateUser(user);
  };

  return {
    user,
    setUser,
    updateUser,
    img,
    updateUserImage,
    household,
    setHousehold,
    updateHousehold,
    logIn,
    logOut,
    restoreUser,
    stories,
    setStories,
    getAuthToken,
    householdLinkID,
    setHouseholdLinkID,
  };
};
