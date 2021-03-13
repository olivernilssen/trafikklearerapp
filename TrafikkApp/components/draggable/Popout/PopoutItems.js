import React from 'react';

import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../styles';

/**
 * Component for the items inside the animated popout menu
 * @param {dictionary} props
 * @returns popoutItems as small circles
 */
const PopoutItems = (props) => {
    const {
        radius,
        array,
        setPopoutActive,
        removeButtonPos,
        setTintColor,
        buttonSize,
        removeItem,
    } = props;

    /**
     * Function to calculate the x and y coordinates as a half circle
     * around an object. depending on which position the item has in
     * the array it is placed in
     * @param {Int} i
     * @returns the x and y position of the circle
     */
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

    const onPressOption = (color, isRemoveButton, isResetButton) => {
        isRemoveButton
            ? removeItem()
            : !isResetButton
            ? setTintColor(color)
            : setTintColor(null); //ERROR THIS ONE DOES NOT WORK, makes the image invisible
    };

    /**
     * This returns each object that is in the array
     * as a small circle placed according to the function calculateXY
     */
    return array.map((color, i) => {
        const isResetButton = color == 'reset';
        const isRemoveButton = i == removeButtonPos;
        color = isResetButton
            ? '#DDDDDD'
            : isRemoveButton
            ? Colors.deleteButtonActive
            : color;

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
                    onPressOut={() =>
                        onPressOption(color, isRemoveButton, isResetButton)
                    }>
                    <Animated.View
                        style={[
                            styles.circleInTouchable,
                            {
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor: color,
                                borderRadius: buttonSize,
                            },
                        ]}>
                        {isRemoveButton && (
                            <Icon
                                name={'times'}
                                solid
                                size={buttonSize - 10}
                                color={Colors.textLight}
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
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    });
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        position: 'absolute',
        elevation: 10,
        alignItems: 'center',
    },
    circleInTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PopoutItems;
