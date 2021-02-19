import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, Component } from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import { TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Color from '../../styles/Colors';
import { Header, Left, Body, Right } from 'native-base';
import { Colors, View, Text, ColorPalette } from 'react-native-ui-lib';

const { Popover } = renderers;

const SketchHeader = (props) => {
    const {
        pencil,
        undo,
        clear,
        eraser,
        onPencilColorChange,
        topMenuHidden,
    } = props;

    const [currentColorSetup, setCurrentColorSetup] = useState({
        color: INITIAL_COLOR,
        textColor: Colors.white,
        paletteChange: false,
    });
    const [isActive, setActive] = useState(0);
    const [prevActive, setPrevActive] = useState(0);

    const INITIAL_COLOR = '#20303C';
    const colors = [
        '#20303C',
        '#3182C8',
        '#00AAAF',
        '#00A65F',
        '#E2902B',
        '#D9644A',
        '#CF262F',
        '#8B1079',
    ];

    const iconBtns = [
        { iconName: 'pen', altIconName: 'pen', pressed: pencil, active: 0 },
        {
            iconName: 'trash',
            altIconName: 'trash',
            pressed: clear,
            active: 0,
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
            active: 0,
        },
        {
            iconName: 'box',
            altIconName: 'box-open',
            pressed: topMenuHidden,
            active: 4,
        },
    ];

    const focusedActiveButton = (value) => {
        if (value === 0) {
            setActive(prevActive);
        } else {
            setPrevActive(value);
        }
    };

    const HeaderBtn = iconBtns.map((item, index) => {
        return (
            <View style={styles.spacedRight} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        item.pressed(),
                            setActive(item.active),
                            focusedActiveButton(item.active);
                    }}>
                    <Icon
                        name={isActive === 4 ? item.altIconName : item.iconName}
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

    const PencilColorPopup = () => {
        const onPaletteValueChange = (value, options) => {
            setCurrentColorSetup({
                color: value,
                textColor: options ? options.tintColor : undefined,
                paletteChange: true,
            });
            forceChange(value);
        };

        const forceChange = (value) => {
            onPencilColorChange(value);
        };

        const {
            color,
            textColor,
            customColors,
            paletteChange,
        } = currentColorSetup;

        return (
            <View key={currentColorSetup.color}>
                <Menu
                    renderer={Popover}
                    // opened={true}
                    rendererProps={{ preferredPlacement: 'bottom' }}>
                    <MenuTrigger>
                        <Icon
                            name={'circle'}
                            size={15}
                            solid
                            color={currentColorSetup.color}
                            style={styles.buttonSize}
                        />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption>
                            <ColorPalette
                                value={color}
                                swatchStyle={{
                                    width: 250 / colors.length,
                                    height: 250 / colors.length,
                                }}
                                onValueChange={onPaletteValueChange}
                                colors={colors}
                                numberOfRows={2}
                                containerWidth={250}
                                usePagination={false}
                            />
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    };

    // const PencilSizePopup = () => {

    //     return (
    //         <View>
    //             <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
    //             <MenuTrigger><Icon name={'circle'} solid size={32} color={currentColorSetup.color}/></MenuTrigger>
    //             <MenuOptions>
    //                 <MenuOption style={styles.colorMenu} ><ColorPalette value={currentColorSetup.color} onValueChange={onPaletteValueChange} colors={colors} numberOfRows={2} containerWidth={200} /></MenuOption>
    //             </MenuOptions>
    //             </Menu>
    //         </View>
    //     )
    // };

    return (
        <View style={styles.toolBar}>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity onPress={props.navigation.toggleDrawer}>
                        <Icon
                            name={'bars'}
                            size={32}
                            color={Color.headerText}
                        />
                    </TouchableOpacity>
                </Left>
                <Left style={styles.test}>
                    <PencilColorPopup />
                    {/* <PencilSizePopup /> */}
                </Left>
                <Body style={{}}></Body>
                <Right>
                    {HeaderBtn}
                    {/* <ComponentButton /> */}
                </Right>
            </Header>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.header,
    },
    toolBar: {
        width: '100%',
        elevation: 10,
    },
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
    },
    spacedRight: {
        flex: 1,
    },

    test: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 2,
        width: '100%',
        height: '20%',
        backgroundColor: Colors.dark80,
    },
});

export default SketchHeader;
