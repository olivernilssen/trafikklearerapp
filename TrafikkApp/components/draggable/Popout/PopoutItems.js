import React from 'react';

import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PopoutItems = (props) => {
    const {
        radius,
        array,
        setPopoutActive,
        exitButtonPos,
        setTintColor,
        buttonSize,
    } = props;

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

    return array.map((color, i) => {
        const isResetButton = color == 'reset';
        color = isResetButton ? '#DDDDDD' : color;

        const isExitButton = i == exitButtonPos;

        const coords = calculateXY(i);
        return (
            <View
                key={color + i}
                style={[
                    styles.button,
                    {
                        top: coords.y - buttonSize / 2,
                        right: coords.x - buttonSize / 2,
                        height: buttonSize,
                        width: buttonSize,
                        padding: 5,
                    },
                ]}>
                <TouchableOpacity
                    color={color}
                    onPress={() => {
                        !isExitButton
                            ? !isResetButton
                                ? setTintColor(color)
                                : setTintColor(null) //ERROR THIS ONE DOES NOT WORK, makes the image invisible
                            : setPopoutActive(false);
                    }}>
                    <View
                        style={[
                            styles.circleInTouchable,
                            {
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor: color,
                                borderRadius: buttonSize,
                            },
                        ]}>
                        {isExitButton && (
                            <Icon
                                name={'times'}
                                solid
                                size={buttonSize - 10}
                                color={'black'}
                            />
                        )}
                        {isResetButton && (
                            <Icon
                                name={'undo'}
                                solid
                                size={buttonSize - 10}
                                color={'black'}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    });
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
    },
    circleInTouchable: {
        justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
    },
});

export default PopoutItems;