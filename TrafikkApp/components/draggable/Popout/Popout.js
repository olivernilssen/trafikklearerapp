import React, { useState, useEffect } from 'react';

import { StyleSheet, Animated } from 'react-native';
import PopoutItems from './PopoutItems';

const Popout = (props) => {
    const { popoutActive, itemSize } = props;

    const [scale, setScale] = useState(new Animated.Value(0));

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
};

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
