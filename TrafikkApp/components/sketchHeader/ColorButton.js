import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ColorPalette } from 'react-native-ui-lib';
import { Colors, Buttons, Icons, Typography } from '../../styles';
import { Menu, MenuOption } from 'react-native-popup-menu';

const ColorButton = (props) => {
    const {
        colorName,
        buttonID,
        colorButtonID,
        onPaletteColorChange,
        chosenColorButton,
        setOpened,
        propsStyle,
    } = props;

    return (
        <MenuOption
            customStyles={{
                OptionTouchableComponent: TouchableWithoutFeedback,
            }}
            value={TouchableWithoutFeedback}>
            <View style={{}}>
                <View style={250 / 8}>
                    <TouchableOpacity
                        onPress={() => {
                            onPaletteColorChange(colorName);
                            chosenColorButton(buttonID);
                            setOpened(false);
                        }}>
                        <Icon
                            name={'circle'}
                            fontcolor={colorName}
                            color={colorName}
                            solid
                            size={Icons.small}
                            style={
                                colorButtonID === buttonID
                                    ? styles.buttonSpacing
                                    : [
                                          propsStyle.buttonSize,
                                          propsStyle.buttonInactive,
                                      ]
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </MenuOption>
    );
};

const styles = StyleSheet.create({
    buttonSpacing: {
        ...Buttons.round,
        backgroundColor: Colors.header,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
});

export default ColorButton;
