import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import fetchMessages from "../api/messages";

function MessagesScreen(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then((Response) => {
      setMessages(Response);
    });
  }, []);

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(messages) => messages.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            // image={item.image}
          />
        )}
      />
    </Screen>
  );
}

export default MessagesScreen;
