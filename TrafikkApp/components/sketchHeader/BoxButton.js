import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';
import { Buttons, Colors, Typography, Icons } from '../../styles';

/**
 * This is the button component for the
 * box that is either open or closed on the sketchheader
 * @param {props} props
 */
const BoxButton = (props) => {
    const { topMenuHidden, toggleRightMenuState } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => topMenuHidden()}
                style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                <Icon
                    name={!toggleRightMenuState ? 'box-open' : 'box'}
                    style={
                        !toggleRightMenuState
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
    buttonActive: {
        // backgroundColor: 'yellow',
        // flex: 1,
        color: Colors.textLight,
        // fontSize: 20,
        backgroundColor: Colors.iconActive,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: Color.tabButtonBorder,
        // width: '100%',
        // height: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: Icons.mediumBackground,
        height: Icons.mediumBackground,
        ...Buttons.round,
        ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        // fontSize: 30,
        backgroundColor: Colors.header,
        // borderRightWidth: 1,
        // borderLeftWidth: 1,
        // borderColor: Color.tabButtonBorder,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Typography.large,
    },
});

export default BoxButton;
