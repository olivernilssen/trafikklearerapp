import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';

import { Colors, Typography, Buttons, Icons } from '../../styles';

/**
 * IconButtons is the buttons at the top menu for the sketcharea
 * @param {props} props
 */
const HeaderButton = (props) => {
    const {
        iconName,
        buttonOnPress,
        focusedActiveButton,
        isActive,
        buttonActiveNumber,
        propsStyle,
    } = props;

    return (
        <View style={propsStyle}>
            <TouchableOpacity
                onPress={() => {
                    buttonOnPress(), focusedActiveButton(buttonActiveNumber);
                }}>
                <Icon
                    name={iconName}
                    style={
                        isActive === buttonActiveNumber
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
        // fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...Typography.large,
    },
    // buttonIcon: {
    //     color: Color.iconPrimary,
    //     borderColor: Color.tabButtonBorder,
    //     //marginRight: '5%'
    // },
    buttonActive: {
        // backgroundColor: 'yellow',
        // flex: 1,
        color: Colors.textLight,
        // fontSize: 30,
        backgroundColor: Colors.iconActive,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderRadius: 50,
        // borderColor: Colors.iconActive,
        width: Icons.mediumBackground,
        height: Icons.mediumBackground,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Buttons.round,
        ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        // fontSize: 30,
        backgroundColor: Colors.header,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: Colors.tabButtonBorder,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Typography.large,
    },
    // colorButton: {
    //     fontSize: 30,
    // },
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
