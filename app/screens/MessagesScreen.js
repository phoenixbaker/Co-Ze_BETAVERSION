import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import DisplayImage from "../components/DisplayImage";
import Colours from "../config/Colours";
import AppText from "../config/AppText";

function MessagesScreen({ navigation }) {
  const { household, user, img } = useAuth();
  const [users, setUsers] = useState(household.users);

  useEffect(() => {
    setUsers(household.users);
  }, [household.users]);

  const checkValid = (item) => {
    if (!item.messages) return false;
    // if (!([user._id] in item.messages)) return false;
    if (!item.messages[user._id].length) return false;
    return true;
  };

  return (
    <>
      <View style={styles.header}>
        <AppText style={styles.headerText} autoCapitalize>
          Messages
        </AppText>
      </View>
      <Screen>
        <FlatList
          data={users}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => {
            if (item._id === user._id) return;
            return (
              <ListItem
                title={item.name}
                subTitle={
                  checkValid(item)
                    ? item.messages[user._id][0].message
                    : "Start a convo"
                }
                onPress={() =>
                  navigation.navigate("MessageUser", {
                    selectedUser: item,
                  })
                }
                JSXImage={
                  <DisplayImage
                    img={img[item._id]}
                    imageStyle={{
                      borderWidth: 2,
                      borderColor: Colours.secondary,
                    }}
                  />
                }
              />
            );
          }}
        />
      </Screen>
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

export default MessagesScreen;
