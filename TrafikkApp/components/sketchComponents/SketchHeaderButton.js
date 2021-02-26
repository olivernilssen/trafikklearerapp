import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Color from '../../styles/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, View } from 'react-native-ui-lib';
import { IconButtons } from '../buttons/headerButtons';

const SketchHeaderButton = (props) => {
    const [isActive, setActive] = useState(0);
    const [prevActive, setPrevActive] = useState(0);

    const {
        pencil,
        undo,
        clear,
        eraser,
        topMenuHidden,
        toggleRightMenuState,
    } = props;

    const buttonArray = [
        {
            iconName: 'pen',
            altIconName: 'pen',
            pressed: pencil,
            active: 0,
        },
        {
            iconName: 'eraser',
            altIconName: 'eraser',
            pressed: eraser,
            active: 1,
        },
        {
            iconName: 'trash',
            altIconName: 'trash',
            pressed: clear,
            active: null,
        },
        {
            iconName: 'undo-alt',
            altIconName: 'undo-alt',
            pressed: undo,
            active: null,
        },
    ];

    const focusedActiveButton = (value) => {
        if (value === null) {
            setPrevActive(prevActive);
        } else {
            setActive(value);
            setPrevActive(value);
        }
    };

    const iconButtons = buttonArray.map((item, index) => {
        return (
            <View style={styles.spacedRight} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        item.pressed(),
                            // setActive(item.active, item.active),
                            focusedActiveButton(item.active);
                    }}>
                    <Icon
                        name={item.iconName}
                        style={
                            isActive === index
                                ? styles.buttonActive
                                : [styles.buttonSize, styles.buttonInactive]
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    });

    const ComponentButton = () => {
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

    return (
        <View style={styles.spacedRight}>
            {iconButtons}
            <IconButtons />
            <ComponentButton />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        color: Color.iconPrimary,
        borderColor: Color.tabButtonBorder,
        //marginRight: '5%'
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
    colorButton: {
        fontSize: 30,
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

export default SketchHeaderButton;
