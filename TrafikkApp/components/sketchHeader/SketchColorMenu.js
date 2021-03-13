import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ColorPalette } from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import PencilSizePopup from './PencilSizePopup';
import ColorButton from './ColorButton';
import { Colors, Typography, Buttons } from '../../styles';

const { Popover } = renderers;

const SketchColorMenu = React.memo((props) => {
    const INITIAL_COLOR = '#CF262F';
    const [isOpened, setOpened] = useState(false);
    const [colorButtonID, setColorButtonID] = useState(0);
    const [chosenColorButtonID, setChosenColorButtonID] = useState(0);

    const {
        onPaletteColorChange,
        onChangePencilSize,
        propsStyle,
        onEraserPencilSwitch,
        buttonActiveId,
        activeId,
        focusedActiveButton,
        pencilColor,
        pencilSize,
        chosenColor,
    } = props;

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

    const onSecondClickOpen = (value) => {
        setOpened(value);
    };

    const chosenColorButton = (value) => {
        setColorButtonID(value);
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
                }}>
                <MenuTrigger
                    onPress={() => {
                        if (activeId != 0) {
                            onEraserPencilSwitch();
                            focusedActiveButton(buttonActiveId);
                            onSecondClickOpen(false);
                        } else {
                            onSecondClickOpen(true);
                        }
                    }}
                    style={
                        activeId === buttonActiveId
                            ? [
                                  styles.buttonActive,
                                  { backgroundColor: pencilColor },
                              ]
                            : [styles.buttonSize, styles.buttonInactive]
                    }>
                    <Icon
                        name={activeId === 0 ? 'chevron-down' : 'pen'}
                        size={30}
                        solid
                        color={Colors.textLight}
                    />
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
                            colorName={colors[0]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />

                        <ColorButton
                            colorName={colors[1]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[2]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[3]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[4]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[5]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[6]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                        <ColorButton
                            colorName={colors[7]}
                            colorButtonID={colorButtonID}
                            buttonID={0}
                            onPaletteColorChange={onPaletteColorChange}
                            chosenColorButton={chosenColorButton}
                            setOpened={setOpened}
                            propsStyle={styles}
                        />
                    </View>
                    <MenuOptions>
                        <View style={styles.iconPlacement}>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(5);
                                    onSecondClickOpen(false);
                                }}>
                                <PencilSizePopup pencilThickness={8} />
                            </MenuOption>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(8);
                                    onSecondClickOpen(false);
                                }}>
                                <PencilSizePopup pencilThickness={11} />
                            </MenuOption>
                            <MenuOption
                                onSelect={() => {
                                    onChangePencilSize(11);
                                    onSecondClickOpen(false);
                                }}>
                                <PencilSizePopup pencilThickness={14} />
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
        ...Typography.large,
    },
    buttonActive: {
        backgroundColor: Colors.iconActive,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Buttons.round,
        ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: 'transparent',
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Typography.large,
    },
    spacedCenter: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlacement: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuOptions: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.colorPaletteMenu,

        overflow: 'hidden',
    },
});

const testLeft = {
    optionTouchable: {
        activeOpacity: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: 'green',
        color: 'green',
        underlayColor: 'gold',
        activeOpacity: 70,
    },
    optionWrapper: {
        borderBottomLeftRadius: 40,
        underlayColor: 'gold',
    },
    optionText: {
        color: 'black',
        borderBottomLeftRadius: 40,
    },
};

const touchableOpacityProps = {
    borderBottomLeftRadius: 40,
    activeOpacity: 0.6,
};

const touchableHighlightProps = {
    borderBottomLeftRadius: 40,
    activeOpacity: 0.5,
};

export default SketchColorMenu;
