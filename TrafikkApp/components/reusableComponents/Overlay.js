import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

/**
 * Component that displays a transparent overlay over the screen.
 * The overlay is touchable, and it is closed when the user touches the overlay.
 * @namespace Overlay
 * @category ReusableComponents
 * @prop {boolean} showOverlay Hook to set, get and toggle the overlay
 */
const Overlay = React.memo((props) => {
    const { showOverlay } = props;

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [zIndex, setZIndex] = useState(10);

    /**
     * useEffect that is triggered when the state showOverlay is changed.
     * Will animate the overlay into view and out of view
     * @memberof Overlay
     */
    useEffect(() => {
        handleAnimation();
    }, [showOverlay.isOpen]);

    /**
     * Function to animate the showing and hiding of the overlay.
     * Will set the value of the backgroundColor,
     * duration of the animation and zIndex of the overlay.
     * @memberof Overlay
     */
    const handleAnimation = () => {
        if (!showOverlay.isOpen) {
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
     * @memberof Overlay
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
            <TouchableWithoutFeedback onPress={() => showOverlay.onClose()}>
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
