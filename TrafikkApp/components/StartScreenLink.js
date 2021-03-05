import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                <Icon name={name} size={Icons.large} color={Colors.textDark} />
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        ...Buttons.largeRounded,
    },
    buttonText: {
        marginTop: 15,
        color: Colors.textDark,
        ...Typography.large,
    },
});

export default StartScreenLink;
