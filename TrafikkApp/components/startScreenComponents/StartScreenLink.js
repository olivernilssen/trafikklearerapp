import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Icons, Colors, Typography } from '../../styles';

/**
 * This component is used to display a link on the StartScreen.
 * @namespace StartScreenLink
 * @category StartScreenComponents
 * @prop {string} name The icon name
 * @prop {string} text The text of the link
 * @prop {function} onPress Function to be triggered when pressing the link
 * @prop {string} backgroundColor The background color of the link
 * @prop {boolean} isLink If it is a external link (opens a web site) or an internal link (opens another screen)
 */
const StartScreenLink = React.memo((props) => {
    const { name, text, onPress, backgroundColor, isLink } = props;

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    { backgroundColor: backgroundColor },
                ]}
                activeOpacity={0.6}
                onPress={onPress}>
                <Text style={[isLink ? styles.linkText : styles.buttonText]}>
                    {text}
                </Text>
                <Icon
                    name={name}
                    size={Icons.medium}
                    color={isLink ? Colors.links : Colors.iconActive}
                    style={isLink ? styles.linkIcon : styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'space-evenly',
        margin: 12,
        elevation: 10,
        ...Buttons.largeRounded,
    },
    icon: {
        position: 'absolute',
        opacity: 0.6,
        bottom: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    linkIcon: {
        position: 'absolute',
        opacity: 0.6,
        top: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        flexWrap: 'wrap',
        ...Typography.section,
    },
    linkText: {
        textAlign: 'center',
        color: Colors.icons,
        flexWrap: 'wrap',
        textDecorationLine: 'underline',
        ...Typography.section,
    },
});

export default StartScreenLink;
