import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Color from '../../styles/Colors';
import { Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, View } from 'react-native-ui-lib';

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
            iconName: 'trash',
            altIconName: 'trash',
            pressed: clear,
            active: null,
        },
        {
            iconName: 'eraser',
            altIconName: 'eraser',
            pressed: eraser,
            active: 2,
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
                                ? styles.btnSelected
                                : [styles.buttonSize, styles.buttonIcon]
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    });

    const ComponentButton = () => {
        return (
            <View style={styles.spacedRight}>
                <TouchableOpacity onPress={() => topMenuHidden()}>
                    <Icon
                        name={!toggleRightMenuState ? 'box-open' : 'box'}
                        style={
                            !toggleRightMenuState
                                ? styles.btnSelected
                                : [styles.buttonSize, styles.buttonIcon]
                        }
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.spacedRight}>
            <Right>
                {iconButtons}
                <ComponentButton />
            </Right>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        fontSize: 30,
    },
    buttonIcon: {
        color: Color.iconPrimary,
        //marginRight: '5%'
    },
    btnSelected: {
        // backgroundColor: 'yellow',
        color: 'red',
        fontSize: 30,
    },
    colorButton: {
        fontSize: 30,
    },
    spacedLeft: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    spacedRight: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SketchHeaderButton;
