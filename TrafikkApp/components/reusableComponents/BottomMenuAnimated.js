import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons } from '../../styles';

/**
 * Component that displays a menu on the bottom of the screen.
 * It has properties to move or hide the view and will show the content of it's children.
 * Takes in other React Native components as children.
 * @namespace BottomMenuAnimated
 * @category ReusableComponents
 * @prop {boolean} bottomSheetHidden If the bottomMenu is hidden or in view
 * @prop {function} setBottomSheetHidden Set the state bottomSheetHidden
 */
const BottomMenuAnimated = React.memo((props) => {
    const { bottomSheetHidden, setBottomSheetHidden, chevronColor } = props;

    const [bounceValue, setBounceValue] = useState(new Animated.Value(0));
    const [hiddenViewButton, setHiddenViewButton] = useState('chevron-down');
    const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

    /**
     * Is triggered when the state bottomSheetHidden is changed
     * Will trigger the toggleSubview function to animate the
     * bottomsheet into view
     * @memberof BottomMenuAnimated

     */
    useEffect(() => {
        toggleSubview();
    }, [bottomSheetHidden]);

    /**
     * This function will change the little icon at the top of the bottom menu
     * to either show a chevron-up or chevron-down.
     * It also animates the menu to either be hidden or shown
     * @memberof BottomMenuAnimated
     */
    const toggleSubview = useCallback(() => {
        setHiddenViewButton(bottomSheetHidden ? 'chevron-up' : 'chevron-down');
        var toValue = bottomSheetHeight;

        if (!bottomSheetHidden) {
            toValue = 0;
        }

        Animated.spring(bounceValue, {
            useNativeDriver: true,
            toValue: toValue,
            velocity: 3,
            tension: 20,
            friction: 8,
        }).start();
    }, [bottomSheetHidden]);

    /**
     * Changes the state of the bottomSheetHidden state.
     * This will also trigger a useEffect to run afterwards.
     * @memberof BottomMenuAnimated
     */
    const onHiddenViewChange = () => {
        setBottomSheetHidden(!bottomSheetHidden);
    };

    /**
     * Is triggered to get the layout (height, width) of the
     * bottomsheet view. This is to accuractly decide how far up
     * on the screen the menu needs to slide.
     * @memberof BottomMenuAnimated
     * @param {dictionary} layout
     */
    const getLayout = (layout) => {
        const { x, y, width, height } = layout;
        setBottomSheetHeight(height);
    };

    return (
        <Animated.View
            style={[
                styles.subView,
                { transform: [{ translateY: bounceValue }] },
            ]}>
            <TouchableOpacity
                style={styles.button}
                onPress={onHiddenViewChange}>
                <Icon
                    name={hiddenViewButton}
                    size={Icons.medium}
                    color={chevronColor ? chevronColor : Colors.icons}
                />
            </TouchableOpacity>

            <View
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
        backgroundColor: Colors.bottomMeny,
        zIndex: 10,
    },
    button: {
        paddingBottom: 10,
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
