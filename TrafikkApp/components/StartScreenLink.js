import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../styles/Colors';
import { RUtils } from 'react-native-responsive-component';

// Eksempel tekststørrelse: 20 på små enheter, 30 på store
const textSize = RUtils.isSmallScreen() ? 20 : 30;
const linkWidth = RUtils.isSmallScreen() ? 130 : 230;
const linkHeight = RUtils.isSmallScreen() ? 130 : 230;
const linkMargin = RUtils.isSmallScreen() ? 20 : 30;

const StartScreenLink = React.memo((props) => {
    const { name, text, onPress } = props;
    const iconSize = RUtils.isSmallScreen() ? 50 : 100;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.linkButton}
                activeOpacity={0.6}
                onPress={onPress}>
                <Icon name={name} size={iconSize} color={Color.buttonText} />
                <Text style={styles.linkText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: linkWidth,
        height: linkHeight,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Color.buttonBorder,
        // marginTop: linkMargin,
        // marginBottom: linkMargin,
        backgroundColor: Color.buttonPrimary,
        elevation: 10,
    },
    linkButton: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        marginTop: 15,
        fontSize: textSize,
        color: Color.buttonText,
    },
});

export default StartScreenLink;
