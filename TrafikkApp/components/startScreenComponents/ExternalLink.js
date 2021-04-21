import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Buttons } from '../../styles';

/**
 * This component is used to display a clickable external link on the StartScreen.
 * @namespace ExternalLink
 * @category StartScreenComponents
 * @prop {string} text The text of the link
 * @prop {function} onPress Function to be triggered when clicking the link
 */
const ExternalLink = React.memo((props) => {
    const { text, onPress } = props;

    return (
        <View>
            <TouchableOpacity
                style={styles.linkContainer}
                activeOpacity={0.6}
                onPress={onPress}>
                <Text style={styles.linkText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    linkContainer: {
        justifyContent: 'space-evenly',
        margin: 12,
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'center',
        backgroundColor: Colors.startScreenLinkLink,
        ...Buttons.rounded,
        ...Buttons.extraLargeWidth,
    },
    linkText: {
        textAlign: 'center',
        color: Colors.links,
        flexWrap: 'wrap',
        textDecorationLine: 'underline',
        ...Typography.section,
    },
});

export default ExternalLink;
