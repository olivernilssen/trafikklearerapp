import React, { useState, useCallback, useLayoutEffect } from 'react';
import Gestures from 'react-native-easy-gestures';
import {
    StyleSheet,
    Animated,
    View,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { Popout } from './Popout/';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = [
    'exit',
    '#000000',
    '#e09f3e',
    '#9e2a2b',
    '#284b63',
    '#3a5a40',
    'delete',
];

const noColors = ['delete'];

const ITEM_SIZE = windowWidth * 0.13;
const radius = (ITEM_SIZE * 2) / 2;
const buttonSize = windowWidth * 0.04;

/**
 * Component that holds the actual draggable component.
 * @namespace Draggable
 * @category DraggableComponents
 * @prop {string} source Image source of the draggable object
 */
const Draggable = React.memo((props) => {
    //States
    const { imgInfo } = props;
    const [imgScale, setimgScale] = useState(new Animated.Value(1));
    const [tintColor, setTintColor] = useState(props.tintColor);
    const [popoutActive, setPopoutActive] = useState(false);

    /**
     * @memberof Draggable
     * @typedef {function} useLayoutEffect
     * @description useLayoutEffect that is triggered when tintColor is changed.
     * Will make the popout menu inactive.
     */
    useLayoutEffect(() => {
        setPopoutActive(!popoutActive);
    }, [tintColor]);

    /**
     * When user starts dragging the object, this function is triggered.
     * will remove the popout menu if it is active
     * and make the item hover as a feedback that the dragging has
     * started.
     * @memberof Draggable
     * @param {array} gesture The gesture used
     */
    const onDragStart = (gesture) => {
        //Start spring animation (user feedback)
        setPopoutActive(false);

        Animated.spring(imgScale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    /**
     * When the user stops dragging the object, this function is triggered.
     * Will make the hover animation end and the item to pop back to it's
     * original size.
     * @memberof Draggable
     * @param {array} gesture The gesture used
     */
    const onDragEnd = (gesture) => {
        Animated.spring(imgScale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    /**
     * Function that is triggered when pressing the delete button
     * in the popout menu of the draggable object.
     * Will remove the draggable object from the screen.
     * @memberof Draggable
     * @function
     */
    const removeItem = useCallback(() => {
        props.onRemoveItem(props.id);
    });

    return (
        <Gestures
            draggable={true}
            scalable={true}
            rotatable={true}
            style={styles.container}
            onEnd={(event) => onDragEnd(event)}
            onStart={(event) => onDragStart(event)}>
            <View>
                <TouchableWithoutFeedback
                    onLongPress={() => setPopoutActive(true)}
                    accessibilityRole={'image'}>
                    <View>
                        <Animated.Image
                            source={imgInfo.source}
                            resizeMode={'contain'}
                            style={[
                                styles.item,
                                tintColor === null
                                    ? null
                                    : imgInfo.hasTint === false
                                    ? { tintColor: tintColor }
                                    : null,
                                {
                                    transform: [{ scale: imgScale }],
                                },
                            ]}
                        />
                        {popoutActive && (
                            <Popout
                                radius={radius}
                                array={imgInfo.hasTint ? noColors : colors}
                                setPopoutActive={setPopoutActive}
                                popoutActive={popoutActive}
                                setTintColor={setTintColor}
                                buttonSize={buttonSize}
                                itemSize={ITEM_SIZE}
                                removeItem={removeItem}
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Gestures>
    );
});

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: '100%',
    },
    itemNoTint: {
        width: '100%',
        height: '100%',
    },
    container: {
        position: 'absolute',
        top: windowHeight / 2,
        left: windowWidth / 2,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        justifyContent: 'center',
    },
});

export default Draggable;
