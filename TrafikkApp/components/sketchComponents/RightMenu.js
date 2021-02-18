import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

import Color from '../../styles/Colors';

let windowWidth = Dimensions.get('window').width * 2;
// const windowHeight = Dimensions.get('window').height;
const menuHeight = 150;
let startXPosition = -(windowWidth / 4);

const RightMenu = (props) => {
    const { toggleRightMenu } = props;

    const yPosHidden = -menuHeight - menuHeight / 2;
    const yPosNotHidden = yPosHidden + menuHeight;
    const [boxScale, setBoxScale] = useState(new Animated.Value(0.5));
    const [bounceValue, setBounceValue] = useState(
        new Animated.Value(yPosHidden)
    );

    useEffect(() => {
        toggleView();
    }, [toggleRightMenu]);

    const toggleView = () => {
        windowWidth = Dimensions.get('window').width * 2;
        startXPosition = -(windowWidth / 4);

        if (toggleRightMenu) {
            Animated.spring(bounceValue, {
                toValue: yPosNotHidden,
                bounciness: 2,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(bounceValue, {
                toValue: yPosHidden,
                tension: 1,
                friction: 5,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Animated.View
            style={[
                styles.animatedView,
                {
                    transform: [
                        { scale: boxScale },
                        { translateY: bounceValue },
                    ],
                    left: startXPosition,
                    width: windowWidth,
                },
            ]}>
            <View style={styles.menuContent}></View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedView: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        height: menuHeight,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    menuContent: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.borderColor,
        elevation: 10,
    },
});

export default RightMenu;
