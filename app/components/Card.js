import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';

import Colours from '../config/Colours';
import AppText from '../config/AppText';

function Card({cardStyle, children, childrenStyle, title, titleStyle, onPress}) {
    return (
        <TouchableHighlight 
        underlayColor={Colours.lightgray}
        onPress = {onPress} >
        <View
            style={[styles.card, cardStyle]}
        >
            <View
                style={styles.text}
            >
                <AppText
                    style={[styles.title, titleStyle]}
                >
                    {title}
                </AppText>
            </View>
            <View style={[styles.childrenStyle, childrenStyle]}>
                {children}
            </View>
        </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: Colours.titleCardGray,
        margin: 20,
        marginBottom: -5,
    },
    childrenStyle: {
        backgroundColor: Colours.lightgray,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 15,
    },
    text: {
        margin: 15,  
        alignItems: 'center',
        borderColor: Colours.danger,
    },
    title: {
        fontWeight: 'bold',
        color: Colours.primary,
        marginBottom: 3,
    }
})

export default Card;