import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../styles';

/**
 * Component that shows the dropzone area for
 * draggable objects
 * @param {dictonary} props
 * @returns the components at an absolute position
 */
const DraggableDropZone = (props) => {
    // Get the high of the view which is hidden
    const { iconSize, trashHover, setDropZoneValues } = props;

    if (iconSize == null) iconSize = 60; //check if user set the iconSize and if so, change it

    /**
     * Get the layout of the trashcan icon
     * and set the state for the layout
     * @param {dictionary} layout
     */
    const getIconLayout = (layout) => {
        setDropZoneValues(layout);
    };

    return (
        <View
            onLayout={(event) => {
                getIconLayout(event.nativeEvent.layout);
            }}
            style={[
                styles.icon,
                {
                    height: iconSize + 50,
                    width: iconSize + 50,
                },
            ]}>
            <Icon
                color={Colors.deleteButtonActive}
                name={'trash-restore'}
                size={iconSize}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});

export default DraggableDropZone;
