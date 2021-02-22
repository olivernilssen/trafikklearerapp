import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../styles/Colors';

import objectPaths from '../draggable/draggableObjectPaths';

const ComponentItems = (props) => {
    const { onNewDraggable } = props;
    const objects = Object.keys(objectPaths);

    const onElementPress = (source) => {
        console.log('Element pressed');
        onNewDraggable(source);
    };

    const images = objects.map((source, i) => {
        return (
            <View key={i} style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageButton}
                    activeOpacity={0.2}
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

    return <View style={styles.scrollViewContainer}>{images}</View>;
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        marginHorizontal: 40,
        padding: 5,
        alignItems: 'center',
    },
    imageContainer: {
        // zIndex: 999,
        borderRadius: 250,
        borderWidth: 2,
        borderColor: Color.header,
        backgroundColor: Color.header,
    },
    imageButton: {
        height: 40,
        width: 40,
        padding: 5,
    },

    icon: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

export default ComponentItems;
