import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../styles/Colors';

const StartScreenLink = (props) => {
    return (
        <TouchableOpacity
            style={styles.linkContainer}
            activeOpacity={0.8}
            onPress={props.onPress}>
            <Icon name={props.name} size={100} color={Colors.light} />
            <Text style={styles.linkText}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    linkContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.light,
        margin: 30,
        backgroundColor: Colors.colorful,
        elevation: 10,
    },
    linkText: {
        fontSize: 30,
        color: Colors.light,
    },
});

export default StartScreenLink;
