import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Typography, Buttons } from '../../styles';

/**
 * Component that displays a button group.
 * @namespace ButtonGroup
 * @category ReusableComponents
 * @prop {array} values The buttons of the button group
 * @prop {int} selectedValue The selected button
 * @prop {number} [groupWidth] The width of the button group
 * @prop {number} [height] The height of the button group
 * @prop {function} onSelect Handler to be called when the user taps a button
 * @prop {color} highlightBackgroundColor BachgroundColor of the selected button
 * @prop {color} highlightTextColor Text color of the selected button
 * @prop {color} inactiveBackgroundColor BackgroundColor of the inactive button(s)
 * @prop {color} inactiveTextColor Text color of the inactive button(s)
 */
const ButtonGroup = (props) => {
    const {
        values,
        selectedValue,
        groupWidth,
        height,
        onSelect,
        highlightBackgroundColor,
        highlightTextColor,
        inactiveBackgroundColor,
        inactiveTextColor,
        isColorOptions,
    } = props;

    const width = groupWidth != null ? groupWidth : 300;
    const isHeight = height != null ? height : width / 6;
    // const fontSize = textSize != null ? textSize : width / 15;
    const isColorOption = isColorOptions != null ? isColorOptions : false;

    const [buttonSizes, setButtonSizes] = useState([]);
    const [chosenIndex, setChosenIndex] = useState(
        values.indexOf(selectedValue)
    );
    const [hasMounted, setHasMounted] = useState(false);
    const [boxPos, setBoxPos] = useState(new Animated.Value(0));

    /**
     * useEffect that is triggered when selectedValue is changed.
     * Will set the state chosenIndex to the index of the selected value
     * @memberof ButtonGroup
     */
    useEffect(() => {
        setChosenIndex(values.indexOf(selectedValue));
    }, [selectedValue]);

    /**
     * Use effect triggered on mount to set the inital buttonSizes depending on
     * what type of slider it is
     * @memberof ButtonGroup
     */
    useEffect(() => {
        var newSizes = [];
        const smallButton = width / values.length / 3;
        let bigButton = 0;

        if (values.indexOf('O') != -1 || values.indexOf('-') != -1) {
            bigButton = (width - smallButton) / (values.length - 1);
        } else {
            bigButton = width / values.length;
        }

        for (var i = 0; i < values.length; i++) {
            if (values[i] === 'O' || values[i] === '-' || values[i] === '0') {
                newSizes.push(smallButton);
            } else {
                newSizes.push(bigButton);
            }
        }

        setButtonSizes(newSizes);
    }, []);

    /**
     * useEffect that is triggered when chosenValue is changed.
     * Will animate the changing of the selected button
     * @memberof ButtonGroup
     */
    useEffect(() => {
        // Getting sum of numbers
        var sum = buttonSizes.slice(0, chosenIndex).reduce(function (a, b) {
            return a + b;
        }, 0);

        if (!hasMounted) {
            Animated.timing(boxPos, {
                toValue: sum,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(boxPos, {
                toValue: sum,
                useNativeDriver: true,
            }).start();
        }

        setHasMounted(true);
    }, [chosenIndex, buttonSizes]);

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
                            width: buttonSizes[chosenIndex],
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
                                    width: buttonSizes[i],
                                },
                            ]}
                            onPress={() => onValueChanged(value, i)}>
                            {!isColorOption && (
                                <Text
                                    style={[
                                        styles.text,
                                        {
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
                            width: buttonSizes[chosenIndex],
                            borderBottomWidth: 5,
                            borderRadius: 0,
                            transform: [{ translateX: boxPos }],
                            borderColor: 'white',
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
        ...Buttons.rounded,
    },
    text: {
        textAlign: 'center',
        ...Typography.button,
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
        ...Buttons.rounded,
    },
});

export default ButtonGroup;
