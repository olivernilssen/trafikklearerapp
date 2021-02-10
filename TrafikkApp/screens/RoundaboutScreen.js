/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SketchArea } from '../components/sketchComponents/SketchArea';

const RoundAboutScreen = ({ navigation }) => {
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
            <View style={styles.sketchArea}>
                <SketchArea
                    source={currImage}
                    navigation={navigation}
                    name={'Rundkjøring'}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default RoundAboutScreen;
