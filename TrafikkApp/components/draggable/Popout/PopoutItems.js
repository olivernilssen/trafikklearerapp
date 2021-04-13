import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../styles';

/**
 * Component for the items inside the animated popout menu
 * @namespace PopoutItems
 * @category Draggable
 * @subcategory Popout
 * @prop {int} radius radius of popout item
 * @prop {array[]} array array of colors or items in popout menu
 * @prop {function} setTintColor function to set the tintcolor of draggable
 * @prop {int} buttonSize size of buttons in popout menu
 * @prop {function} removeItem function to delete draggable
 */
const PopoutItems = (props) => {
    const { radius, array, setTintColor, buttonSize, removeItem } = props;

    /**
     * Function to calculate the x and y coordinates as a half circle
     * around an object. depending on which position the item has in
     * the array it is placed in
     * @memberof PopoutItems
     * @param {int} index index of a popout item
     * @returns {int} the x position of the circle
     * @returns {int} the y position of the circle
     */
    const calculateXY = (index) => {
        const so = 0; //start offset
        const rx = radius; //radius along x
        const ry = radius; //radius along y
        const n = array.length; //length of items
        const maxCircle = 180;

        const x =
            ry +
            ry * -Math.sin((150 / n / maxCircle) * (index + 1 + so) * Math.PI);
        const y =
            rx +
            -rx * Math.cos((150 / n / maxCircle) * (index + 1 + so) * Math.PI);

        return { x, y };
    };

    /**
     * Check what button is pressed
     * and change either tintcolor, remove it or delete item
     * @memberof PopoutItems
     * @param {hex} color color of selected tint
     * @param {boolean} isRemoveButton if button is the remove button
     * @param {boolean} isResetButton if the button is the reset button (not working)
     */
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
        const isRemoveButton = color == 'delete';
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
                                name={'trash-alt'}
                                solid
                                size={buttonSize - 10}
                                color={Colors.textPrimary}
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
