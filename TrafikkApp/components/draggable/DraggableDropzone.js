/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MainView from '../components/MainView';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import SketchArea from '../components/sketchComponents/SketchArea';
import Colors from '../styles/Colors';

import Header from '../components/Header';
import Draggable from '../components/draggable/Draggable';
import DraggableMenu from '../components/draggable/DraggableMenu';

const RoadScreen = ({ dropZoneValues, setDropZoneValues }) => {
    // Get the high of the view which is hidden
    const getIconLayout = (layout) => {
        setDropZoneValues(layout);
    };

    return (
        <Icon
            onLayout={(event) => {
                getIconLayout(event.nativeEvent.layout);
            }}
            style={styles.icon}
            color={trashHover ? 'red' : 'black'}
            name={trashHover ? 'trash-restore' : 'trash'}
            size={60}
        />
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 30,
    },
});

export default RoadScreen;
