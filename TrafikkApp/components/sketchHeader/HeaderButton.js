import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Color from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';

/**
 * IconButtons is the buttons at the top menu for the sketcharea
 * @param {props} props
 */
const HeaderButton = (props) => {
    const {
        iconName,
        buttonFnc,
        focusedActiveButton,
        isActive,
        buttonNum,
        propsStyle,
    } = props;

    return (
        <View style={propsStyle}>
            <TouchableOpacity
                onPress={() => {
                    buttonFnc(), focusedActiveButton(buttonNum);
                }}>
                <Icon
                    name={iconName}
                    style={
                        isActive === buttonNum
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
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // buttonIcon: {
    //     color: Color.iconPrimary,
    //     borderColor: Color.tabButtonBorder,
    //     //marginRight: '5%'
    // },
    buttonActive: {
        // backgroundColor: 'yellow',
        // flex: 1,
        color: Color.iconPrimary,
        fontSize: 30,
        backgroundColor: Color.tabButtonActive,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        // width: '100%',
        // height: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    buttonInactive: {
        color: Color.iconPrimary,
        fontSize: 30,
        backgroundColor: Color.tabButton,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Color.tabButtonBorder,
        paddingVertical: 12,
        paddingHorizontal: 16,
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
