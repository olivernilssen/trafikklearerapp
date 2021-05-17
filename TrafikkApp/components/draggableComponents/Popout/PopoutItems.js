import React, { useCallback } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../styles';

/**
 * This component contains the items that is displayed inside the animated popout menu,
 * the menu for each draggable object.
 * @namespace PopoutItems
 * @category DraggableComponents
 * @subcategory Popout
 * @prop {int} radius Radius of the popout item
 * @prop {array} array Array of colors or items in the popout menu
 * @prop {function} setTintColor Function to set the tintColor of the draggable object
 * @prop {int} buttonSize Size of the buttons in the popout menu
 * @prop {function} removeItem Function to delete the draggable object
 */
const PopoutItems = React.memo((props) => {
    const {
        radius,
        array,
        setTintColor,
        buttonSize,
        removeItem,
        setPopoutActive,
    } = props;

    /**
     * Function to calculate the x and y coordinates as a half circle
     * around an object, depending on which position the item has in
     * the array it is placed in.
     * @memberof PopoutItems
     * @function
     * @param {int} index index of a popout item
     * @returns {int} the x position of the circle
     * @returns {int} the y position of the circle
     */
    const calculateXY = useCallback((index) => {
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
    });

    /**
     * Function to check which button in the popout menu that is pressed
     * and either change tintColor, remove the object or delete the object.
     * @memberof PopoutItems
     * @param {hex} color Color of the selected tint
     * @param {boolean} isRemoveButton If the button is the remove button
     * @param {boolean} isExitButton If the button is the reset button (not working)
     */
    const onPressOption = (color, isRemoveButton, isExitButton) => {
        isRemoveButton
            ? removeItem()
            : !isExitButton
            ? setTintColor(color)
            : setPopoutActive(false); //ERROR THIS ONE DOES NOT WORK, makes the image invisible
    };

    /**
     * @memberof PopoutItems
     * @typedef {component} PopoutItems
     * @description This maps through the array of items, and
     * returns each object that is in the array as a small circle placed
     * according to the function calculateXY.
     */
    return array.map((color, i) => {
        const isExitButton = color == 'exit';
        const isRemoveButton = color == 'delete';
        color = isExitButton
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
                        onPressOption(color, isRemoveButton, isExitButton)
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
                        {isExitButton && (
                            <Icon
                                name={'times'}
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
});

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
