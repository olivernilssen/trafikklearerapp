import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Buttons } from '../../styles';
import { MenuOption } from 'react-native-popup-menu';

const ColorButton = (props) => {
    const {
        colorName,
        buttonID,
        colorButtonID,
        onPaletteColorChange,
        chosenColorButton,
    } = props;

    return (
        <MenuOption
            customStyles={{
                OptionTouchableComponent: TouchableWithoutFeedback,
            }}
            value={TouchableWithoutFeedback}>
            <View
                style={
                    buttonID != colorButtonID
                        ? styles.buttonSpacing
                        : styles.iconActiveCircle
                }>
                <TouchableOpacity
                    onPress={() => {
                        onPaletteColorChange(colorName);
                        chosenColorButton(buttonID);
                        // setOpened(false);
                    }}>
                    <View
                        style={{
                            ...styles.colorButton,
                            backgroundColor: colorName,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon
                            name={'chevron-down'}
                            style={
                                buttonID != colorButtonID
                                    ? styles.iconColorInactive
                                    : styles.iconColorActive
                            }
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </MenuOption>
    );
};

const styles = StyleSheet.create({
    buttonSpacing: { padding: 5 },
    colorButton: {
        height: 32,
        width: 32,
        ...Buttons.round,
    },
    iconColorActive: {
        color: 'white',
        fontSize: 20,
    },
    iconColorInactive: {
        ...Buttons.round,
        color: '#00000000',
        fontSize: 20,
        padding: 5,
    },
    iconActiveCircle: {
        backgroundColor: Colors.background,
        padding: 5,
        ...Buttons.round,
        opacity: 0.8,
    },
});

export default ColorButton;
