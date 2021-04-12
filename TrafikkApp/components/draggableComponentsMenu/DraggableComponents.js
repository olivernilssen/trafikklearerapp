import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from '../reusableComponents/Carousel';

/**
 * Component for the draggable items that are in the top menu of the screens using the SketchArea component.
 * @namespace DraggableComponents
 * @category DraggableComponentsMenu
 * @prop {function} onNewDraggable function from parent to add new draggable
 */
const DraggableComponents = React.memo((props) => {
    return <Carousel {...props} itemsPerSlide={5} />;
});

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal: 11,
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
