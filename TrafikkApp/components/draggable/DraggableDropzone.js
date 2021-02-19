import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const DraggableDropZone = (props) => {
    // Get the high of the view which is hidden
    const { iconSize, trashHover, setDropZoneValues } = props;

    if (iconSize == null) iconSize = 60; //check if user set the iconSize and if so, change it

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
            size={iconSize}
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

export default DraggableDropZone;
