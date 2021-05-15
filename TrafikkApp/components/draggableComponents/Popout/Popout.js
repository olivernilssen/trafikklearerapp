import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import PopoutItems from './PopoutItems';

/**
 * This components is to show the popout menu for each draggable object.
 * The popout menu shows a half circle of PopoutItems around the draggable object.
 * @namespace Popout
 * @category Draggable
 * @subcategory Popout
 * @prop {boolean} popoutActive Boolean to represent if the popout menu is active or not
 * @prop {function} itemSize Size of the items shown in the popout menu
 */
const Popout = React.memo((props) => {
    const { popoutActive, itemSize } = props;

    const [scale, setScale] = useState(new Animated.Value(0));

    /**
     * useEffect that is triggered when popoutActive state
     * is changed. Will animate the menu in or out of view
     * of the user.
     * @memberof Popout
     */
    useEffect(() => {
        //Animation effect to "hide or show" popup
        if (popoutActive) {
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scale, {
                toValue: 0,
                friction: 4,
                tension: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [popoutActive]);

    return (
        <Animated.View
            style={[
                styles.popoutMenu,
                {
                    top: -itemSize / 2,
                    width: itemSize * 2,
                    height: itemSize * 2,
                    transform: [{ scale: scale }],
                },
            ]}>
            <PopoutItems {...props} />
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    popoutMenu: {
        position: 'absolute',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
});

export default Popout;
