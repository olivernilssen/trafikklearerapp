import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';

import { Colors, Buttons, Icons } from '../../styles';

/**
 * IconButtons is the buttons at the top menu for the sketcharea
 * @param {props} props
 */
const HeaderButton = (props) => {
    const {
        iconName,
        buttonOnPress,
        focusedActiveButton,
        activeId,
        buttonActiveId,
        propsStyle,
    } = props;

    return (
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
                            ? styles.buttonActive
                            : [styles.buttonSize, styles.buttonInactive]
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // ...Typography.large,
    },
    buttonActive: {
        color: Colors.textLight,
        backgroundColor: Colors.iconActive,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Buttons.round,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    spacedRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HeaderButton;
