import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import PencilSizePopup from './PencilSizePopup';
import ColorButton from './ColorButton';
import { Colors, Typography, Buttons, Icons } from '../../styles';
import AppContext from '../../AppContext';

const { Popover } = renderers;

const SketchColorMenu = React.memo((props) => {
    // const appContext = useContext(AppContext);
    // const INITIAL_COLOR = appContext.penColor;
    const [isOpened, setOpened] = useState(false);
    const [colorButtonID, setColorButtonID] = useState(0);
    const [pencilThicknessID, setPencilThicknessID] = useState(0);
    const [menuArrow, setMenuArrow] = useState(false);

    const {
        onPaletteColorChange,
        onChangePencilSize,
        propsStyle,
        onEraserPencilSwitch,
        buttonActiveId,
        activeId,
        focusedActiveButton,
        pencilColor,
    } = props;

    const colorArray = [
        '#20303C',
        '#3182C8',
        '#00AAAF',
        '#00A65F',
        '#E2902B',
        '#D9644A',
        '#CF262F',
        '#8B1079',
    ];

    const onSecondClickOpen = (value) => {
        setOpened(value);
    };

    const chosenColorButton = (value) => {
        setColorButtonID(value);
    };

    const chosenThicknessButton = (value) => {
        setPencilThicknessID(value);
    };

    const onPressMenuArrow = (value) => {
        setMenuArrow(value);
    };

    const onPressMenuTrigger = () => {
        if (activeId != 0) {
            onEraserPencilSwitch();
            focusedActiveButton(buttonActiveId);
            onPressMenuArrow(false);
            onSecondClickOpen(false);
        } else {
            onPressMenuArrow(true);
            onSecondClickOpen(true);
        }
    };

    return (
        <View style={propsStyle}>
            <Menu
                renderer={Popover}
                rendererProps={{
                    preferredPlacement: 'bottom',
                    anchorStyle: { backgroundColor: Colors.colorPaletteMenu },
                }}
                opened={isOpened}
                onBackdropPress={() => {
                    onSecondClickOpen(false);
                    onPressMenuArrow(false);
                }}>
                <MenuTrigger
                    onPress={() => {
                        onPressMenuTrigger();
                    }}
                    // style={
                    //     activeId === buttonActiveId
                    //         ? [
                    //               styles.buttonActive,
                    //               { backgroundColor: pencilColor },
                    //           ]
                    //         : [styles.buttonSize, styles.buttonInactive]
                    // }
                >
                    <View
                        style={
                            activeId === buttonActiveId
                                ? [
                                      styles.buttonSize,
                                      styles.buttonActive,
                                      { backgroundColor: pencilColor },
                                  ]
                                : [styles.buttonSize, styles.buttonInactive]
                        }>
                        <Icon
                            name={'pen'}
                            size={Icons.small}
                            solid
                            color={Colors.textLight}
                        />
                        <Icon
                            name={menuArrow ? 'sort-up' : 'sort-down'}
                            size={25}
                            solid
                            color={Colors.textLight}
                            style={
                                isOpened
                                    ? [styles.upIconMenu]
                                    : [styles.downIconMenu]
                            }
                        />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 10,
                        }}>
                        <ColorButton
                            colorName={colorArray[0]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />

                        <ColorButton
                            colorName={colorArray[1]}
                            colorButtonID={colorButtonID}
                            buttonID={1}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[2]}
                            colorButtonID={colorButtonID}
                            buttonID={2}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[3]}
                            colorButtonID={colorButtonID}
                            buttonID={3}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[4]}
                            colorButtonID={colorButtonID}
                            buttonID={4}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[5]}
                            colorButtonID={colorButtonID}
                            buttonID={5}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[6]}
                            colorButtonID={colorButtonID}
                            buttonID={6}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                        <ColorButton
                            colorName={colorArray[7]}
                            colorButtonID={colorButtonID}
                            buttonID={7}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                        />
                    </View>
                    <MenuOptions>
                        <View style={styles.iconPlacement}>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(5);
                                    chosenThicknessButton(0);
                                }}>
                                <PencilSizePopup
                                    pencilThickness={8}
                                    buttonID={0}
                                    pencilThicknessID={pencilThicknessID}
                                />
                            </MenuOption>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(8);
                                    chosenThicknessButton(1);
                                }}>
                                <PencilSizePopup
                                    pencilThickness={11}
                                    buttonID={1}
                                    pencilThicknessID={pencilThicknessID}
                                />
                            </MenuOption>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(11);
                                    chosenThicknessButton(2);
                                }}>
                                <PencilSizePopup
                                    pencilThickness={14}
                                    buttonID={2}
                                    pencilThicknessID={pencilThicknessID}
                                />
                            </MenuOption>
                        </View>
                    </MenuOptions>
                </MenuOptions>
            </Menu>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        height: 62,
        width: 62,
        ...Buttons.round,
        justifyContent: 'center',
        alignItems: 'center',
    },
    downIconMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: 32,
    },
    upIconMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: 40,
    },
    buttonActive: {
        backgroundColor: Colors.iconActive,
    },
    buttonInactive: {
        color: Colors.icons,
    },
    // spacedCenter: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     height: '100%',
    //     width: '100%',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    iconColorActive: {
        color: Colors.iconActive,
    },
    iconColorInactive: {
        color: '#00000000',
    },
    iconPlacement: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuOptions: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.colorPaletteMenu,
        overflow: 'hidden',
    },
});

export default SketchColorMenu;
