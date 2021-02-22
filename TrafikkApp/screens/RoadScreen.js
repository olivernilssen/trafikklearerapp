/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MainView from '../components/MainView';
import Colors from '../styles/Colors';

import Header from '../components/Header';
import DraggableMenu from '../components/draggable/DraggableMenu';
import DraggableDropZone from '../components/draggable/DraggableDropzone';
import MappingDraggable from '../components/draggable/MappingDraggables';
import DraggableWithEverything from '../components/draggable/DraggableWithEverything';

const RoadScreen = ({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <Header name={'Vei'} navigation={navigation} />

                <DraggableWithEverything />
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
        height: '100%',

        backgroundColor: Colors.textPrimary,
    },
});

export default RoadScreen;
