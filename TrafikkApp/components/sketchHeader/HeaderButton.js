import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';

import { Colors, Buttons, Icons } from '../../styles';

/**
 * IconButtons is the buttons at the top menu for the sketcharea
 * @param {props} props
 */
const HeaderButton = React.memo((props) => {
    const {
        iconName,
        buttonOnPress,
        focusedActiveButton,
        activeId,
        buttonActiveId,
        propsStyle,
    } = props;

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View style={propsStyle}>
                <TouchableOpacity
                    onPress={() => {
                        buttonOnPress(), focusedActiveButton(buttonActiveId);
                    }}>
                    <Icon
                        name={iconName}
                        size={Icons.small}
                        style={
                            activeId === buttonActiveId
                                ? [
                                      styles.buttonActive,
                                      {
                                          backgroundColor:
                                              iconName === 'eraser'
                                                  ? Colors.eraserIconActive
                                                  : Colors.iconActive,
                                      },
                                  ]
                                : [styles.buttonSize, styles.buttonInactive]
                        }
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // ...Typography.large,
    },
    buttonActive: {
        color: Colors.textLight,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: Colors.iconActive,
        ...Buttons.round,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    spacedRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default HeaderButton;
