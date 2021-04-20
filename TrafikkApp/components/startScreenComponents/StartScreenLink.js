import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Icons, Colors, Typography } from '../../styles';

/**
 * This component is used to display a link on the StartScreen, to navigate to other screens in the app.
 * @namespace StartScreenLink
 * @category StartScreenComponents
 * @prop {string} name The icon name
 * @prop {string} text The text to be displayed on the link
 * @prop {function} onPress Function to be triggered when pressing the link
 */
const StartScreenLink = React.memo((props) => {
    const { name, text, onPress, backgroundColor } = props;

    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.buttonContainer,
                    { backgroundColor: backgroundColor },
                ]}
                activeOpacity={0.6}
                onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
                <Icon
                    name={name}
                    size={Icons.medium}
                    color={Colors.iconActive}
                    style={styles.icon}
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
    buttonText: {
        color: Colors.textSecondary,
        textAlign: 'center',
        flexWrap: 'wrap',
        ...Typography.section,
    },
    icon: {
        position: 'absolute',
        opacity: 0.6,
        bottom: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
});

export default StartScreenLink;
