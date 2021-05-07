import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Buttons, Icons } from '../../styles';

/**
 * Component that returns a button, used for eraser- and undo-button in the sketchHeader.
 * @namespace HeaderButton
 * @category SketchHeaderComponents
 * @prop {String} iconName the name of the Icon
 * @prop {Function} buttonOnPress The function you want to use when the button is pressed
 * @prop {number} focusedActiveButton Handles the states of the active buttons
 * @prop {number} activeId The state activeId
 * @prop {number} buttonActiveId The id of the button
 */
const HeaderButton = React.memo((props) => {
    const {
        iconName,
        buttonOnPress,
        focusedActiveButton,
        activeId,
        buttonActiveId,
    } = props;

    return (
        <View
        // style={
        //     activeId === buttonActiveId
        //         ? [
        //               styles.buttonSize,
        //               styles.buttonActive,
        //               {
        //                   backgroundColor:
        //                       iconName === 'eraser'
        //                           ? Colors.eraserIconActive
        //                           : Colors.iconActive,
        //               },
        //           ]
        //         : [styles.buttonSize, styles.buttonInactive]
        // }
        >
            <TouchableOpacity
                onPress={() => {
                    buttonOnPress();
                    focusedActiveButton(buttonActiveId);
                }}
                style={
                    activeId === buttonActiveId
                        ? [
                              styles.buttonSize,
                              styles.buttonActive,
                              {
                                  backgroundColor:
                                      iconName === 'eraser'
                                          ? Colors.eraserIconActive
                                          : Colors.iconActive,
                              },
                          ]
                        : [styles.buttonSize, styles.buttonInactive]
                }>
                <Icon
                    name={iconName}
                    size={Icons.medium}
                    color={
                        activeId === buttonActiveId
                            ? Colors.textPrimary
                            : Colors.icons
                    }
                />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButton,
    },
    buttonActive: {
        backgroundColor: Colors.iconActive,
        ...Buttons.sketchHeaderButton,
        elevation: 5,
        padding: 10,
    },
    buttonInactive: {
        backgroundColor: Colors.headerBg,
        ...Buttons.sketchHeaderButton,
        padding: 10,
    },
});

export default HeaderButton;
