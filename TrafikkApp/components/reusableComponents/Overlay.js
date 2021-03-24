import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

/**
 * Component that displays a transparent overlay on the SketchArea-screens,
 * when the BottomMenu is open
 * @namespace Overlay
 * @memberof reusableComponents
 * @prop {function} setBottomSheetHidden Set the state bottomSheetHidden
 * @prop {boolean} bottomSheetHidden The state bottomSheetHidden
 */
const Overlay = React.memo((props) => {
    const { setBottomSheetHidden, bottomSheetHidden } = props;

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [zIndex, setZIndex] = useState(10);

    /**
     * useEffect that is triggered when bottomSheetHidden is changed.
     * Will animate the overlay into view and out of view
     */
    useEffect(() => {
        handleAnimation();
    }, [bottomSheetHidden]);

    /**
     * Function to animate the showing and hiding of the overlay.
     * Will set the value of the backgroundColor,
     * duration of the animation and zIndex of the overlay
     * @memberof reusableComponents.Overlay
     */
    const handleAnimation = () => {
        if (bottomSheetHidden) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
            }).start(() => {
                setZIndex(-100);
            });
        } else {
            setZIndex(10);
            Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    };

    /**
     * Defines which colors to animate between
     * @memberof reusableComponents.Overlay
     * @function
     * @param {Array} inputRange The ranges to interpolate between
     * @param {Array} outputRange The colors to interpolate between
     */
    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)'],
    });

    /**
     * Declares the animated backgroundColor to pass to the animated view
     */
    const animatedStyle = {
        backgroundColor: boxInterpolation,
    };

    return (
        <Animated.View
            style={{
                ...styles.overlay,
                ...animatedStyle,
                zIndex: zIndex,
            }}>
            <TouchableWithoutFeedback
                onPress={() => setBottomSheetHidden(true)}>
                <View style={styles.touchableArea}></View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    touchableArea: {
        flex: 1,
    },
});

export default Overlay;
