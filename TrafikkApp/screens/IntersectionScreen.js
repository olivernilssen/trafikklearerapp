/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';

const IntersectionScreen = ({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigation={navigation}
                    name={'Veikryss'}></SketchArea>
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
