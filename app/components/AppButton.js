import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colours from '../config/Colours';

function AppButton(
    
    { buttonStyle, icon, iconStyle, iconColor, iconSize, text, textStyle, onPress }

) {
    return (
        <TouchableOpacity
            style={[styles.defaultButton, buttonStyle]}
            onPress={onPress}
        >
            <Text
                style={[styles.defaultText, textStyle]}
            >
                {text}
            </Text>

            {icon &&
                <MaterialCommunityIcons
                    name={icon}
                    size={[20, iconSize]}
                    style={[styles.defaultIcon, iconStyle]}
                    color={[Colours.mediumgray, iconColor]}
                />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    defaultButton: {
        backgroundColor: Colours.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        padding: 15,
        marginVertical: 10,
        borderRadius: 25,
    },
    defaultIcon: {
        marginRight: 10,
    },
    defaultText: {
        color: Colours.white,
        fontSize: 18,
        textTransform: 'uppercase',
    }
})

export default AppButton;