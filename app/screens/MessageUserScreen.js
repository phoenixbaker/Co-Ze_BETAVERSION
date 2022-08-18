import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import AppText from "../config/AppText";
import { deleteMessage, postMessage } from "../api/messages";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import Colours from "../config/Colours";
import DisplayImage from "../components/DisplayImage";
import useAuth from "../auth/useAuth";
import ListItem from "../components/ListItem";
import { sendNotification } from "../api/notification";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

export default function MessageUserScreen({ route }) {
  const { selectedUser } = route.params;
  const { img, updateUser, household, user } = useAuth();

  const [valid, setValid] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleMessages = () => {
    setMessages([]);
    let selectedArr = [];
    let index;
    household.users.forEach((user, i) => {
      if (user._id === selectedUser._id) return (index = i);
    });

    if (household.users[index].messages === undefined)
      return handleUserMessages(selectedArr);
    if (household.users[index].messages[user._id] === undefined)
      return handleUserMessages();
    household.users[index].messages[user._id].forEach((message, i) => {
      return selectedArr.push([
        { id: selectedUser._id, name: selectedUser.name },
        message,
      ]);
    });
    return handleUserMessages(selectedArr);
  };

  const handleUserMessages = (messageArr) => {
    if (user.messages === undefined) return;
    if (user.messages[selectedUser._id] === undefined) return;
    user.messages[selectedUser._id].forEach((message, i) => {
      return messageArr.push([{ id: user._id, name: user.name }, message]);
    });
    return sortMessages(messageArr);
  };

  const sortMessages = (messageArr) => {
    var temp = 0;
    for (var i = 0; i < messageArr.length; i++) {
      for (var j = i; j < messageArr.length; j++) {
        if (messageArr[j][1].time < messageArr[i][1].time) {
          temp = messageArr[j];
          messageArr[j] = messageArr[i];
          messageArr[i] = temp;
        }
      }
    }
    return setMessages(messageArr);
  };

  useEffect(() => {
    handleMessages();
  }, []);

  useEffect(() => {
    handleMessages();
  }, [household, user]);

  useEffect(() => {
    if (messages.length > 0) setValid(true);
  });

  const handleSubmit = async ({ message }) => {
    const { data } = await postMessage(message, selectedUser);
    updateUser(data);
    sendNotification(selectedUser.notificationToken.data, user, message);
  };

  const handleDelete = async (item) => {
    if (item[0].id !== user._id) return;
    const { data } = await deleteMessage(item[1].message, selectedUser._id);
    updateUser(data);
    sendNotification(
      selectedUser.notificationToken.data,
      user,
      "Deleted A Message"
    );
  };
  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          {selectedUser.name}
        </AppText>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8 }}>
          {valid ? (
            <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  JSXlistSeperator={
                    <>
                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: Colours.gray,
                        }}
                      ></View>
                    </>
                  }
                  title={item[1].message}
                  containerstyles={
                    item[0].id === user._id && {
                      flexDirection: "row-reverse",
                    }
                  }
                  detailContainerStyles={
                    item[0].id === user._id && { marginRight: 20 }
                  }
                  JSXImage={
                    <DisplayImage
                      img={img[item[0].id]}
                      imageStyle={{ height: 50, width: 50 }}
                    />
                  }
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
                  )}
                />
              )}
            />
          ) : (
            <ListItem
              title={selectedUser.name}
              subTitle="Lets start a convo"
              JSXImage={<DisplayImage img={img[selectedUser._id]} />}
            />
          )}
        </View>
        <View
          style={{
            width: "90%",
            flex: 0.2,
            justifyContent: "flex-end",
            alignSelf: "center",
          }}
        >
          <AppForm
            initialValues={{
              message: "",
            }}
            onSubmit={handleSubmit}
          >
            <AppFormField
              name="message"
              icon="message"
              placeholder="Send a Message"
              autoCorrect
              inputStyle={{
                backgroundColor: "transparent",
                borderColor: Colours.primary,
                borderWidth: 2,
              }}
            />
            <SubmitButton
              title="Send Message"
              textStyle={{
                fontWeight: "700",
              }}
            />
          </AppForm>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colours.primary,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: Colours.white,
    fontSize: 25,
    top: 15,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
