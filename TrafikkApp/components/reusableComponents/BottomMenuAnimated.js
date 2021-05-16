import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    StyleSheet,
    Animated,
    TouchableOpacity,
    View,
    PanResponder,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons } from '../../styles';

let _value = { x: 0, y: 0 };
let xOffset = 0;

/**
 * Component that displays a menu on the bottom of the screen.
 * It has properties to move or hide the view and will show the content of it's children.
 * Takes in other React Native components as children.
 * @namespace BottomMenuAnimated
 * @category ReusableComponents
 * @prop {object} bottomSheetOpen Hook which stores the state and function to handle if its open or closed
 */
const BottomMenuAnimated = React.memo((props) => {
    const { bottomSheetOpen, chevronColor } = props;

    //this value is used to help panresonder not having to re-render
    const sheetValue = useRef(bottomSheetOpen.isOpen);
    const heightRef = useRef(bottomSheetHeight);

    const [hiddenViewButton, setHiddenViewButton] = useState(
        bottomSheetOpen.isOpen ? 'chevron-down' : 'chevron-up'
    );
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = React.useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (evt, gestureState) => {
                    return (
                        Math.abs(gestureState.dx) > 3 ||
                        Math.abs(gestureState.dy) > 3
                    );
                },
                onPanResponderGrant: () => {
                    pan.setOffset({
                        y: pan.y._value,
                    });
                },

                onPanResponderMove: (e, gesture) => {
                    if (
                        sheetValue.current &&
                        gesture.dy >= 0 &&
                        gesture.dy <= heightRef.current
                    ) {
                        pan.setValue({ x: 0, y: gesture.dy });
                    } else if (
                        !sheetValue.current &&
                        gesture.dy >= -heightRef.current &&
                        gesture.dy <= 0
                    ) {
                        pan.setValue({ x: 0, y: gesture.dy });
                    } else {
                        pan.setOffset({ x: 0, y: _value.y });
                        pan.setValue({ x: 0, y: 0 });
                    }
                },

                onPanResponderEnd: (e, gesture) => {
                    pan.flattenOffset();
                    const goBack =
                        (sheetValue.current &&
                            gesture.dy <= heightRef.current / 3) ||
                        (!sheetValue.current &&
                            gesture.dy >= -heightRef.current / 3);

                    if (goBack) {
                        toggleSubview();
                    } else {
                        bottomSheetOpen.onToggle();
                    }
                },
            }),
        [bottomSheetOpen.isOpen]
    );

    /** Use effect to help panresponder keep a current version of the bottomsheetOpen value
     * @memberof BottomMenuAnimated
     */
    useEffect(() => {
        sheetValue.current = bottomSheetOpen.isOpen;
    }, [bottomSheetOpen.isOpen]);

    React.useEffect(() => {
        const listener = pan.addListener((value) => (_value = value));
        return () => {
            pan.removeListener(listener);
        };
    }, []);

    /**
     * Is triggered when the state bottomSheetOpen is changed
     * Will trigger the toggleSubview function to animate the
     * bottomsheet into view
     * @memberof BottomMenuAnimated

     */
    useEffect(() => {
        toggleSubview();
    }, [bottomSheetOpen.isOpen]);

    /**
     * This function will change the little icon at the top of the bottom menu
     * to either show a chevron-up or chevron-down.
     * It also animates the menu to either be hidden or shown
     * @memberof BottomMenuAnimated
     */
    const toggleSubview = useCallback(() => {
        setHiddenViewButton(
            bottomSheetOpen.isOpen ? 'chevron-down' : 'chevron-up'
        );

        var toValue = bottomSheetHeight;

        if (bottomSheetOpen.isOpen) {
            toValue = 0;
        }

        Animated.timing(pan.y, {
            useNativeDriver: false,
            toValue: toValue,
        }).start();
    });

    /**
     * Is triggered to get the layout (height, width) of the
     * bottomsheet view. This is to accuractly decide how far up
     * on the screen the menu needs to slide.
     * @memberof BottomMenuAnimated
     * @param {dictionary} layout
     */
    const getLayout = (layout) => {
        const { x, y, width, height } = layout;
        heightRef.current = height;
        setBottomSheetHeight(height);
    };

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.subView,
                {
                    transform: [
                        {
                            translateY: pan.y,
                        },
                    ],
                },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => bottomSheetOpen.onToggle()}>
                <Icon
                    name={hiddenViewButton}
                    size={Icons.medium}
                    color={chevronColor ? chevronColor : Colors.icons}
                />
            </TouchableOpacity>

            <View
                pointerEvents="box-none"
                onLayout={(event) => {
                    getLayout(event.nativeEvent.layout);
                }}
                style={styles.bottomContainer}>
                {props.children}
            </View>
        </Animated.View>
    );
});

var styles = StyleSheet.create({
    subView: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bottomMenuTransparent,
        zIndex: 10,
        // height: '100%',
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        opacity: 0.8,
    },
    bottomContainer: {
        backgroundColor: Colors.bottomMeny,
        paddingBottom: 10,
        alignItems: 'center',
        elevation: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.dividerPrimary,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default BottomMenuAnimated;
