/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles';

import SketchArea from '../components/sketchComponents/SketchArea';

const IntersectionScreen = ({ navigation }) => {
    const hoyreX = require('../assets/intersections/hoyrekryss/veikryss-hoyre-X.png');
    const forkjorsX = require('../assets/intersections/forkjorskryss/veikryss-forkjors-X.png');
    const lysX = require('../assets/intersections/lyskryss/veikryss-lys-X.png');

    const [currImage, setImage] = useState(hoyreX);
    const [FabActive, setActiveFab] = useState(false);

    const onImageChange = (newImage) => {
        setImage(newImage);
        setActiveFab(!FabActive);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={screenStyles.sketchArea}>
                <SketchArea source={currImage} />
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default IntersectionScreen;
