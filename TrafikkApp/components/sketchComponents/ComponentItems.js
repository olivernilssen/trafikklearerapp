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

const ComponentItems = (props) => {
    const { onNewDraggable } = props;
    const objects = Object.keys(objectPaths);

    const onElementPress = (source) => {
        onNewDraggable(objectPaths[source]);
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

    return (
        <ScrollView horizontal={true} persistentScrollbar={true}>
            <View style={styles.scrollViewContainer}>{images}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        alignItems: 'center',
    },
    imageContainer: {
        marginHorizontal: 15,
        // borderRadius: 250,
        // borderWidth: 2,
        // borderColor: Color.header,
        // backgroundColor: Color.header,
    },
    imageButton: {
        padding: 5,
    },
    icon: {
        height: 30,
        width: 30,
    },
});

export default ComponentItems;
