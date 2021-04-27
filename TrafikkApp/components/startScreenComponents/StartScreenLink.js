import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Icons, Colors, Typography } from '../../styles';
import { RUtils } from 'react-native-responsive-component';

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
                {!RUtils.isSmallScreen() && (
                    <Icon
                        name={name}
                        size={Icons.medium}
                        color={Colors.iconActive}
                        style={styles.icon}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 12,
        elevation: 10,
        ...Buttons.startScreen,
    },
    buttonText: {
        flex: 1,
        color: Colors.textSecondary,
        textAlign: 'center',
        flexWrap: 'wrap',
        padding: 10,
        textAlignVertical: 'center',
        ...Typography.startScreenLink,
    },
    icon: {
        position: 'absolute',
        opacity: 0.6,
        bottom: 0,
        right: 0,
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
});

export default StartScreenLink;
