import React from 'react';
import { StyleSheet, View } from 'react-native'

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import Colours from '../config/Colours';

function AccountScreen(props) {
    return (
        <Screen>
            <View style={styles.container}>
                <ListItem
                    title="Phoenix Baker"
                    titleStyle={{
                        fontWeight: '700'
                    }}
                    subTitle="phoenixbvu@gmail.com"
                    image={require("../assets/ProfilePicture.jpg")}
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