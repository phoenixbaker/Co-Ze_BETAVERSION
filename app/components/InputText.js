import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function InputText({icon, iconStyle, inputStyle, textStyle, ...otherProps}) {
    return (
        <View
            style={[styles.container, inputStyle]}
        >
            {icon && <MaterialCommunityIcons
                name={icon}
                size={20}
                style={[styles.iconContainer, iconStyle]}
                color={defaultStyles.Colours.mediumgray}
            />}
            
            <TextInput
                style={[defaultStyles.text, styles.textInput, textStyle]}
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 55,
        borderRadius: 20,
        padding: 15,
        paddingRight: 40,
        marginVertical: 10,
        backgroundColor: defaultStyles.Colours.lightgray ,
        flexDirection: 'row',
    },
    iconContainer: {
        marginRight: 10,
    },
    textInput: {
        width: '100%',
    },
})

export default InputText;