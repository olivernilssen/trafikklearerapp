/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';
import BottomSheet from '../components/sketchComponents/bottomSheet';

const IntersectionScreen = ({ navigation }) => {
    const hoyreX = require('../assets/intersections/hoyrekryss/veikryss-hoyre-X.png');

    const [currImage, setImage] = useState(hoyreX);
    const [FabActive, setActiveFab] = useState(false);

    const onImageChange = (newImage) => {
        setImage(newImage);
        setActiveFab(!FabActive);
    };

    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    source={currImage}
                    navigation={navigation}
                    name={'Veikryss'}>
                    <BottomSheet
                        onImageChange={onImageChange}
                        type={'Intersection'}
                    />
                </SketchArea>
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default IntersectionScreen;
