import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Color from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';

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
                style={{ flex: 1, justifyContent: 'space-around' }}>
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
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
});

export default BoxButton;
