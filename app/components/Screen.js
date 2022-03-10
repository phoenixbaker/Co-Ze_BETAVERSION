import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView} from 'react-native';

import Colours from '../config/Colours';

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: Colours.white,
    }
})

export default Screen;