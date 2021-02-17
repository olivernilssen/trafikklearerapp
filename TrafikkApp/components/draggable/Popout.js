import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Popout = (props) => {
    const {
        radius,
        array,
        setPopoverActive,
        popoutActive,
        exitButtonPos,
        setTintColor,
        buttonSize,
        itemSize,
    } = props;

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

    const calculateXY = (i) => {
        const so = 0; //start offset
        const rx = radius; //radius along x
        const ry = radius; //radius along y
        const n = array.length; //length of items
        const maxCircle = 180;

        const x =
            ry + ry * -Math.sin((150 / n / maxCircle) * (i + 1 + so) * Math.PI);
        const y =
            rx + -rx * Math.cos((150 / n / maxCircle) * (i + 1 + so) * Math.PI);

        return { x, y };
    };

    const PopoutItems = () => {
        return array.map((color, i) => {
            const coords = calculateXY(i);
            const isExitButton = i == exitButtonPos;
            return (
                <TouchableOpacity
                    key={color}
                    color={color}
                    style={[
                        styles.button,
                        {
                            top: coords.y - buttonSize / 2,
                            right: coords.x - buttonSize / 2,
                            height: buttonSize,
                            width: buttonSize,
                            backgroundColor: color,
                            borderRadius: buttonSize,
                        },
                    ]}
                    onPress={() => {
                        !isExitButton
                            ? setTintColor(color)
                            : setPopoverActive(false);
                    }}>
                    {isExitButton && <Icon name={'times'} color={'black'} />}
                </TouchableOpacity>
            );
        });
    };

    return (
        <Animated.View
            style={[
                styles.popoutMenu,
                {
                    top: -itemSize / 2,
                    width: itemSize * 2,
                    height: itemSize * 2,
                    borderRadius: radius,
                    transform: [{ scale: scale }],
                },
            ]}>
            <PopoutItems />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        elevation: 10,
        alignItems: 'center',
    },
    buttonView: {
        position: 'absolute',
        zIndex: 1,
    },
    popoutMenu: {
        position: 'absolute',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
});

export default Popout;
