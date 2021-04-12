import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Carousel } from '../reusableComponents/';
import AppContext from '../../AppContext';

/**
 * Component for the draggable items that are in the top menu of the screens using the SketchArea component.
 * @namespace DraggableComponents
 * @category DraggableComponentsMenu
 * @prop {function} onNewDraggable function from parent to add new draggable
 */
const DraggableComponents = React.memo(({ onNewDraggable }) => {
    const appContext = useContext(AppContext);
    const objects = JSON.parse(appContext.draggableObjects);
    const objectKeys = Object.keys(objects);

    /**
     * Gets the image source of the draggable
     * and creates a new draggable item.
     * @memberof DraggableComponents
     * @param {int} source image source of new draggable
     */
    const onElementPress = (source) => {
        onNewDraggable(objects[source]);
    };

    /**
     * Displays the available draggable images that can be used.
     * @return all the images that are in the "objects" array
     */
    const images = objectKeys.map((source, i) => {
        return (
            <View key={i} style={styles.imageContainer}>
                <TouchableOpacity
                    activeOpacity={0.4}
                    style={styles.imageButton}
                    onPress={() => onElementPress(source)}>
                    <Image
                        source={objects[source]}
                        style={styles.image}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    });

    return <Carousel objectArray={images} itemsPerSlide={7} />;
});

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    imageButton: {
        paddingHorizontal: 5,
    },
    image: {
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

export default DraggableComponents;
