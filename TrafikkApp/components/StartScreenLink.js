import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import RComponent, { RUtils } from 'react-native-responsive-component';

const textSize = RUtils.isSmallScreen() ? 20 : 30;

const StartScreenLink = (props) => {
    const iconSize = RUtils.isSmallScreen() ? 50 : 100;

    return (
        <RComponent
            render$={() => View}
            style$sm={styles.containerSm}
            style$md={styles.containerMd}>
            <TouchableOpacity
                style={styles.linkButton}
                activeOpacity={0.6}
                onPress={props.onPress}>
                <Icon name={props.name} size={iconSize} color={Colors.light} />
                <Text style={styles.linkText}>{props.text}</Text>
            </TouchableOpacity>
        </RComponent>
    );
};

const styles = StyleSheet.create({
    containerMd: {
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
    containerSm: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 130,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: Colors.light,
        margin: 20,
        backgroundColor: Colors.colorful,
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
        color: Colors.light,
    },
});

export default StartScreenLink;
