import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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

    const isColorOption = isColorOptions != null ? isColorOptions : false;
    const width = groupWidth != null ? groupWidth : 300;
    const fontSize = textSize != null ? textSize : width / 15;
    const isHeight = height != null ? height : width / 6;
    const buttonSize = width / values.length;

    const [chosenIndex, setChosenIndex] = useState(
        values.indexOf(selectedValue)
    );
    const [boxPos, setBoxPos] = useState(
        new Animated.Value(chosenIndex * buttonSize)
    );

    useEffect(() => {
        setChosenIndex(values.indexOf(selectedValue));
    }, [selectedValue]);

    useEffect(() => {
        Animated.spring(boxPos, {
            toValue: buttonSize * chosenIndex,
            bounciness: 0,
            speed: 2,
            useNativeDriver: true,
        }).start();
    }, [chosenIndex]);

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
                            style={[styles.touchable, { width: buttonSize }]}
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