import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Color from '../../styles/Colors';

import objectPaths from '../draggable/draggableObjectPaths';

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
        // <ScrollView horizontal={true} persistentScrollbar={true}>
        <View style={styles.container}>{images}</View>
        // </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    imageContainer: {
        margin: 10,
        padding: 5,
        // borderRadius: 250,
        // borderWidth: 2,
        // borderColor: Color.borderColor,
        // backgroundColor: Color.borderColor,
    },
    imageButton: {
        padding: 5,
    },
    icon: {
        height: 40,
        width: 40,
    },
});

export default ComponentItems;
