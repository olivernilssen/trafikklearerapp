import React from 'react';
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import ThemeVariables from '../../styles/themeVariables';
import { button } from '../../styles/typography';

/**
 * Component that displays a button group
 * @namespace ButtonGroup
 * @category ReusableComponents
 * @prop {array} values The buttons of the button group
 * @prop {int} selectedValue Selected button
 * @prop {number} [groupWidth] The width of the button group
 * @prop {number} [textSize] Font size of the buttons
 * @prop {function} onSelect Handler to be called when the user taps a button
 * @prop {color} highlightBackgroundColor BachgroundColor of the selected button
 * @prop {color} highlightTextColor Text color of the selected button
 * @prop {color} inactiveBackgroundColor BackgroundColor of the inactive button(s)
 * @prop {color} inactiveTextColor Text color of the inactive button(s)
 * @prop {number} [height] The height of the button group
 * @prop {int} middleButtonSize if the middle button should be small in a 3 length group
 */
const ButtonGroup = (props) => {
    const {
        values,
        selectedValue,
        groupWidth,
        textSize,
        onSelect,
        highlightBackgroundColor,
        highlightTextColor,
        inactiveBackgroundColor,
        inactiveTextColor,
        isColorOptions,
        height,
    } = props;

    const width = groupWidth != null ? groupWidth : 300;
    const isHeight = height != null ? height : width / 6;

    const buttonSize = width / values.length;

    // const fontSize = textSize != null ? textSize : width / 15;
    const fontSize = ThemeVariables.FONT_SIZE_BODY;
    const isColorOption = isColorOptions != null ? isColorOptions : false;

    const [chosenIndex, setChosenIndex] = useState(
        values.indexOf(selectedValue)
    );
    const [boxPos, setBoxPos] = useState(
        new Animated.Value(chosenIndex * buttonSize)
    );

    /**
     * useEffect that is triggered when selectedValue is changed.
     * Will set the state chosenIndex to the index of the selected value
     */
    useEffect(() => {
        setChosenIndex(values.indexOf(selectedValue));
    }, [selectedValue]);

    /**
     * useEffect that is triggered when chosenValue is changed.
     * Will animate the changing of the selected button
     */
    useEffect(() => {
        Animated.spring(boxPos, {
            toValue: buttonSize * chosenIndex,
            bounciness: 0,
            speed: 2,
            useNativeDriver: true,
        }).start();
    }, [chosenIndex]);

    /**
     * Handler that is called when the user taps a button.
     * Sets the state of the chosenIndex
     * @memberof ButtonGroup
     * @param {string} value The name of the button
     * @param {int} i The index of the button
     */
    const onValueChanged = (value, i) => {
        onSelect(value);
        setChosenIndex(i);
    };

    return (
        <View
            style={[
                styles.mainView,
                {
                    width: width,
                    height: isHeight,
                    backgroundColor: inactiveBackgroundColor,
                },
            ]}>
            {!isColorOption && (
                <Animated.View
                    style={[
                        styles.slider,
                        {
                            height: isHeight,
                            width: buttonSize,
                            backgroundColor: highlightBackgroundColor,
                            transform: [{ translateX: boxPos }],
                        },
                    ]}
                />
            )}

            {values.map((value, i) => {
                return (
                    <View
                        key={i}
                        style={[
                            styles.buttonView,
                            isColorOption
                                ? {
                                      borderTopLeftRadius: i == 0 ? 10 : 0,
                                      borderTopRightRadius:
                                          i === values.length - 1 ? 10 : 0,
                                      borderBottomLeftRadius: i === 0 ? 10 : 0,
                                      borderBottomRightRadius:
                                          i === values.length - 1 ? 10 : 0,
                                      backgroundColor: value,
                                  }
                                : null,
                        ]}>
                        <TouchableOpacity
                            style={[
                                styles.touchable,
                                {
                                    width: buttonSize,
                                },
                            ]}
                            onPress={() => onValueChanged(value, i)}>
                            {!isColorOption && (
                                <Text
                                    style={[
                                        styles.text,
                                        {
                                            fontSize: fontSize,
                                            color:
                                                i == chosenIndex
                                                    ? highlightTextColor
                                                    : inactiveTextColor,
                                        },
                                    ]}>
                                    {value}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                );
            })}

            {isColorOption && (
                <Animated.View
                    style={[
                        styles.slider,
                        {
                            height: isHeight,
                            width: buttonSize,
                            // backgroundColor: 'transparent',
                            // borderBottomColor: 'white',
                            borderBottomWidth: 5,
                            borderRadius: 0,
                            transform: [{ translateX: boxPos }],
                        },
                    ]}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonView: {
        flexDirection: 'row',
    },
    slider: {
        position: 'absolute',
        borderRadius: 10,
    },
});

export default ButtonGroup;
