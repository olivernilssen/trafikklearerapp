import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Buttons, Icons, Colors, Typography } from '../styles';

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
                <Icon
                    name={name}
                    size={Icons.small}
                    color={Colors.iconActive}
                    style={styles.icon}
                />
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: 12,
        elevation: 5,
        ...Buttons.largeRounded,
    },
    icon: {
        // alignSelf: 'flex-start',
        padding: 15,
    },
    buttonText: {
        marginTop: 15,
        color: Colors.textDark,
        textAlign: 'center',
        fontWeight: 'bold',
        ...Typography.medium,
    },
});

export default StartScreenLink;
