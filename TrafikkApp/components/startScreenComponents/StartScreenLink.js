import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Icons, Colors, Typography } from '../../styles';

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
                <Text style={[isLink ? styles.linkText : styles.buttonTextOld]}>
                    {text}
                </Text>
                <Icon
                    name={name}
                    size={Icons.small}
                    color={isLink ? Colors.links : Colors.iconActive}
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
    icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    buttonTextOld: {
        color: Colors.textDark,
        textAlign: 'center',
        fontWeight: 'bold',
        ...Typography.mediumPlus,
    },
    buttonText: {
        color: Colors.textLight,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: Colors.background,
        textShadowRadius: 1,
        textShadowOffset: { width: 0, height: -1 },
        textAlign: 'center',
        ...Typography.mediumPlus,
    },

    linkText: {
        textAlign: 'center',
        color: 'blue',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        ...Typography.mediumPlus,
    },
});

export default StartScreenLink;
