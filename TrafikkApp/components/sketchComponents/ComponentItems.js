import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../../styles/Colors';
import objectPaths from '../draggable/draggableObjectPaths';

import Carousel from '../Carousel';

const ComponentItems = React.memo(({ onNewDraggable }) => {
    const objects = Object.keys(objectPaths);

    const onElementPress = (source) => {
        onNewDraggable(objectPaths[source]);
    };

    const images = objects.map((source, i) => {
        return (
            <View key={i} style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageButton}
                    activeOpacity={0.4}
                    onPress={() => onElementPress(source)}>
                    <Image
                        source={objectPaths[source]}
                        style={styles.icon}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <View>
            <Carousel objectArray={objects}>
                {images}
                {images}
            </Carousel>
        </View>
    );
});

const styles = StyleSheet.create({
    imageContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 5,
        // borderRadius: 250,
        // borderWidth: 2,
        // borderColor: Color.borderColor,
        // backgroundColor: Color.borderColor,
    },
    imageButton: {
        paddingHorizontal: 5,
    },
    icon: {
        height: 40,
        width: 40,
    },
    bullets: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 25,
    },
});

export default ComponentItems;
