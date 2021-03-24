import { TouchableOpacity, StyleSheet, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Buttons, Icons } from '../../styles';

/**
 * IconButtons is the buttons at the top menu for the sketcharea
 * @namespace HeaderButton
 * @memberof SketchHeader
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
        <View>
            <View
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
                <TouchableOpacity
                    onPress={() => {
                        buttonOnPress();
                        focusedActiveButton(buttonActiveId);
                    }}>
                    <Icon
                        name={iconName}
                        size={Icons.small}
                        color={Colors.textLight}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        height: 62,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.round,
    },
    buttonActive: {
        color: Colors.textLight,
        backgroundColor: Colors.iconActive,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
    },
    spacedRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
});

export default HeaderButton;
