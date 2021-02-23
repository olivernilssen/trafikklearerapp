import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import Popout from './Popout/Popout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = [
    '#000000',
    '#e09f3e',
    '#9e2a2b',
    '#284b63',
    '#3a5a40',
    'reset',
    '#DDDDDD',
];

import Gestures from 'react-native-easy-gestures';

const ITEM_SIZE = 100;
const radius = (ITEM_SIZE * 2) / 2;
const buttonSize = 25;

const Draggable = React.memo((props) => {
    //States
    const { source, dropZoneValues } = props;
    const [imgScale, setimgScale] = useState(new Animated.Value(1));
    const [isScaling, setIsScaling] = useState(false);
    const [tintColor, setTintColor] = useState(props.tintColor);
    const [popoutActive, setPopoutActive] = useState(false);
    // const [popoutScaling, setPopoutScaling] = useState(new Animated.Value(1));

    useEffect(() => {
        setPopoutActive(!popoutActive);
    }, [tintColor]);

    const onDragStart = (gesture) => {
        //Start spring animation (user feedback)
        setPopoutActive(false);

        Animated.spring(imgScale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const onDragMove = (gesture) => {
        if (isDropArea(gesture) && !isScaling) {
            props.onTrashHover(true);
        } else {
            props.onTrashHover(false);
        }
    };

    const onDragEnd = (gesture) => {
        //If in dropzone, delete element
        if (isDropArea(gesture) && !isScaling) {
            //End spring animation to trashcan
            Animated.spring(imgScale, {
                toValue: 0.1,
                velocity: 1,
                bounciness: 0,
                useNativeDriver: true,
            }).start(() => removeItem());
        } else {
            //End spring animation
            Animated.spring(imgScale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        }

        setIsScaling(false);
    };

    //Helper function so we can run to functions
    //after animation over trashcan has ended
    const removeItem = () => {
        props.onRemoveItem(props.id);
        props.onTrashHover(false);
    };

    const isDropArea = (gesture) => {
        var dz = dropZoneValues;

        var isInZone =
            gesture.nativeEvent.pageX >= dz.x &&
            gesture.nativeEvent.pageX <= dz.x + dz.height &&
            gesture.nativeEvent.pageY >= dz.y;

        return isInZone;
    };

    return (
        <Gestures
            draggable={true}
            scalable={true}
            rotatable={true}
            style={styles.container}
            onEnd={(event) => onDragEnd(event)}
            onChange={(event) => onDragMove(event)}
            onStart={(event) => onDragStart(event)}
            onScaleStart={() => setIsScaling(true)}>
            <View>
                <TouchableWithoutFeedback
                    onLongPress={() => setPopoutActive(!popoutActive)}
                    accessibilityRole={'image'}>
                    <Animated.Image
                        source={source}
                        resizeMode={'contain'}
                        style={[
                            styles.item,
                            tintColor === null
                                ? null
                                : { tintColor: tintColor },
                            {
                                transform: [{ scale: imgScale }],
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>

                <Popout
                    radius={radius}
                    array={colors}
                    setPopoutActive={setPopoutActive}
                    popoutActive={popoutActive}
                    exitButtonPos={colors.length - 1}
                    setTintColor={setTintColor}
                    buttonSize={buttonSize}
                    itemSize={ITEM_SIZE}
                />
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
        // zIndex: -1,
    },
});

export default Draggable;
