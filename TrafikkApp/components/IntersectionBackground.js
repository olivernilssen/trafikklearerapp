import React, { useState } from 'react';
import { View, StyleSheet, Button, ImageBackground } from 'react-native';

import Colors from '../styles/Colors';

const IntersectionBackground = (props) => {
    const hoyreX = require('../assets/intersections/hoyrekryss/veikryss-hoyre-X.png');
    const forkjorsX = require('../assets/intersections/forkjorskryss/veikryss-forkjors-X.png');
    const lysX = require('../assets/intersections/lyskryss/veikryss-lys-X.png');

    const [currImage, setImage] = useState(hoyreX);

    const onImageChange = (newImage) => {
        setImage(newImage);
    };

    return (
        <View style={screenStyles.container}>
            <ImageBackground
                style={screenStyles.backgroundImage}
                source={currImage}>
                {props.children}
            </ImageBackground>

            <View style={screenStyles.footerNav}>
                <Button
                    title="Høyrekryss"
                    onPress={() => onImageChange(hoyreX)}
                />

                <Button title="Lyskryss" onPress={() => onImageChange(lysX)} />

                <Button
                    title="Forkjørskryss"
                    onPress={() => onImageChange(forkjorsX)}
                />
            </View>
        </View>
    );
};

const screenStyles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    footerNav: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
        backgroundColor: Colors.light,
    },
});

export default IntersectionBackground;
