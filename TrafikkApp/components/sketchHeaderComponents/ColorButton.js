import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Buttons, Typography } from '../../styles';
import { MenuOption } from 'react-native-popup-menu';

/** Color button component
 * returns a color button based on the props it receives
 * @namespace ColorButton
 * @memberof sketchHeaderComponents
 * @prop {string} colorName The color from the colorArray
 * @prop {number} buttonID A number used to identify the button
 * @prop {number} colorButtonID The state colorButtonID
 * @prop {function} onPaletteColorChange Updates the state by passing the colorName in it
 * @prop {function} chosenColorButton Updates the state by passing the buttonID in it
 */
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
                        style={[
                            styles.colorButton,
                            { backgroundColor: colorName },
                        ]}>
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
    buttonSpacing: {
        padding: 8,
    },
    iconActiveCircle: {
        padding: 8,
        opacity: 0.8,
        ...Buttons.round,
    },
    colorButton: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButtonSmall,
    },
    iconColorActive: {
        color: Colors.textPrimary,
        fontSize: 20,
    },
    iconColorInactive: {
        color: '#00000000',
        padding: 8,
        ...Buttons.round,
        ...Typography.body,
    },
});

export default ColorButton;
