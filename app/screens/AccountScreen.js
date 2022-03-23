import React from 'react';
import { StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import Colours from '../config/Colours';

function AccountScreen({navigation}) {
    return (
      <Screen>
        <View style={styles.container}>
          <ListItem
            title="Phoenix Baker"
            titleStyle={{
              fontWeight: "700",
            }}
            subTitle="phoenixbvu@gmail.com"
            image={require("../assets/ProfilePicture.jpg")}
          />
          <ListItem
            title="LOGOUT"
            titleStyle={{
              fontWeight: "700",
            }}
            IconComponent={<MaterialCommunityIcons name="logout" size={40} color="black" />}
            // onPress={navigation.navigate("Welcomescreen")}
            // Create Nav for each screen
          />
        </View>
      </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colours.lightgray,
        borderRadius: 20,
    },
})

export default AccountScreen;