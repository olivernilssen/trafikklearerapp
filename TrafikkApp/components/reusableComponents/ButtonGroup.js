import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Typography, Buttons, Colors } from '../../styles';

/**
 * Component that displays a button group.
 * @namespace ButtonGroup
 * @category ReusableComponents
 * @prop {array} values The buttons of the button group
 * @prop {int} selectedValue The selected button
 * @prop {number} [groupWidth] The width of the button group
 * @prop {number} [height] The height of the button group
 * @prop {function} onSelect Handler to be called when the user taps a button
 * @prop {color} highlightBackgroundColor BackgroundColor of the selected button
 * @prop {color} highlightTextColor Text color of the selected button
 * @prop {color} inactiveBackgroundColor BackgroundColor of the inactive button(s)
 * @prop {color} inactiveTextColor Text color of the inactive button(s)
 */
const ButtonGroup = (props) => {
    const {
        values,
        selectedValue,
        width,
        height,
        onSelect,
        highlightBackgroundColor,
        highlightTextColor,
        inactiveBackgroundColor,
        inactiveTextColor,
        isColorOption,
    } = props;

    const adjHeight = height === 100 ? width / 7 : height;

    const [chosenIndex, setChosenIndex] = useState(
        values.indexOf(selectedValue)
    );
    // This state is to help the text to change color only once the animation is done
    // So we don't get weird color flickering
    const [indexAnimDone, setIndexAnimDone] = useState(
        values.indexOf(selectedValue)
    );
    const [hasMounted, setHasMounted] = useState(false);
    const [newValue, setNewValue] = useState(selectedValue);
    const [boxPos, setBoxPos] = useState(new Animated.Value(0));

    /**
     * @memberof ButtonGroup
     * @typedef {function} useEffect
     * @description useEffect that is triggered when selectedValue is changed.
     * Will set the state chosenIndex to the index of the selected value.
     */
    useEffect(() => {
        setChosenIndex(values.indexOf(selectedValue));
    }, [selectedValue]);

    /**
     * @memberof ButtonGroup
     * @typedef {function} useEffect
     * @description UseEffect triggered on mount to set the inital buttonSizes depending on
     * what type of slider it is.
     */
    useEffect(() => {
        // Getting sum of numbers
        var sum = buttonSizes.slice(0, chosenIndex).reduce(function (a, b) {
            return a + b;
        }, 0);

        Animated.spring(boxPos, {
            toValue: sum,
            bounciness: 0,
            speed: 2,
            useNativeDriver: true,
        }).start();
    }, [chosenIndex, buttonSizes]);

    useEffect(() => {
        var newSizes = [];
        const smallButton = width / values.length / 3;
        let bigButton = 0;

        if (
            values.indexOf('O') != -1 ||
            values.indexOf('-') != -1 ||
            values.indexOf('x') != -1
        ) {
            bigButton = (width - smallButton) / (values.length - 1);
        } else {
            bigButton = width / values.length;
        }

        for (var i = 0; i < values.length; i++) {
            if (
                values[i] === 'O' ||
                values[i] === '-' ||
                values[i] === '0' ||
                values[i] === 'x'
            ) {
                newSizes.push(smallButton);
            } else {
                newSizes.push(bigButton);
            }
        }

        setButtonSizes(newSizes);
    }, [width]);

    /**
     * @memberof ButtonGroup
     * @typedef {function} useEffect
     * @description useEffect that is triggered when chosenValue is changed.
     * Will animate the changing of the selected button.
     */
    useEffect(() => {
        // Getting sum of numbers
        var sum = buttonSizes.slice(0, chosenIndex).reduce(function (a, b) {
            return a + b;
        }, 0);

        if (!hasMounted) {
            Animated.timing(boxPos, {
                toValue: sum,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(boxPos, {
                toValue: sum,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }

        setHasMounted(true);
        setIndexAnimDone(chosenIndex);
    }, [chosenIndex, buttonSizes]);

    /**
     * Handler that is called when the user taps a button.
     * Sets the state of the chosenIndex.
     * @memberof ButtonGroup
     * @param {string} value The name of the button
     * @param {int} i The index of the button
     */
    const onValueChanged = (value, i) => {
        setChosenIndex(i);
        setNewValue(value);
    };

    useEffect(() => {
        if (newValue != selectedValue) onSelect(newValue);
    }, [newValue]);

    return (
        <>
            {buttonSizes.length !== 0 && (
                <View
                    style={[
                        styles.mainView,
                        {
                            width: width,
                            height: adjHeight,
                            backgroundColor: inactiveBackgroundColor,
                        },
                    ]}>
                    {!isColorOption && (
                        <Animated.View
                            style={[
                                styles.slider,
                                {
                                    height: adjHeight,
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
                                              borderTopLeftRadius:
                                                  i === 0 ? 10 : 0,
                                              borderTopRightRadius:
                                                  i === values.length - 1
                                                      ? 10
                                                      : 0,
                                              borderBottomLeftRadius:
                                                  i === 0 ? 10 : 0,
                                              borderBottomRightRadius:
                                                  i === values.length - 1
                                                      ? 10
                                                      : 0,
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
                                    onPress={() => onValueChanged(value, i)}
                                    activeOpacity={0.7}>
                                    {!isColorOption && (
                                        <Text
                                            style={[
                                                styles.text,
                                                {
                                                    color:
                                                        i == indexAnimDone
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
                                    height: adjHeight,
                                    width: buttonSizes[chosenIndex],
                                    borderBottomWidth: 5,
                                    borderBottomLeftRadius:
                                        chosenIndex === 0 ? 10 : 0,
                                    borderBottomRightRadius:
                                        chosenIndex === values.length - 1
                                            ? 10
                                            : 0,
                                    transform: [{ translateX: boxPos }],
                                    borderColor: 'white',
                                },
                            ]}
                        />
                    )}
                </View>
            )}
        </>
    );
};

ButtonGroup.defaultProps = {
    width: 300,
    height: 100,
    highlightBackgroundColor: Colors.slideActiveBg,
    highlightTextColor: Colors.slideTextActive,
    inactiveBackgroundColor: Colors.slideInactiveBg,
    inactiveTextColor: Colors.slideTextInactive,
    isColorOptions: false,
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
