import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import PencilSizeButton from './PencilSizeButton';
import ColorButton from './ColorButton';
import { Colors, Buttons, Icons } from '../../styles';
import AppContext from '../../AppContext';
// import { RUtils } from 'react-native-responsive-component';
import { isSmallScreen } from '../reusableComponents/globalFunctions';

const { Popover } = renderers;

/**
 * An array that holds the colors that are used for the color buttons.
 * These are also the colors used to draw with.
 */
const colorArray = [
    { colorCode: '#20303C', key: '20403C' },
    { colorCode: '#3182C8', key: '3182C8' },
    { colorCode: '#00AAAF', key: '00AAAF' },
    { colorCode: '#00A65F', key: '00A65F' },
    { colorCode: '#E2902B', key: 'E2902B' },
    { colorCode: '#D9644A', key: 'D9644A' },
    { colorCode: '#CF262F', key: 'CF262F' },
    { colorCode: '#8B1079', key: '8B1079' },
];

/**
 * An array that holds the thickness of the "icons" (view) for the pencil thickness buttons
 * and the pencil thickness used for changing the thickness of the pencil.
 */
const pencilThicknessArray = [
    { viewThickness: 8, pencilThickness: 5, key: 85 },
    { viewThickness: 11, pencilThickness: 8, key: 118 },
    { viewThickness: 14, pencilThickness: 11, key: 1411 },
];

/**
 * A button with a menu for the drawing component of the SketchHeader.
 * @namespace SketchColorMenu
 * @category SketchHeaderComponents
 * @prop {function} onPaletteColorChange Changes the color
 * @prop {function} onChangePencilSize Changes pencil size
 * @prop {object} propsStyle StyleSheet
 * @prop {function} onEraserPencilSwitch handles the switch between eraser and pencil
 * @prop {number} buttonActiveId The id of the pencil button in the header
 * @prop {number} activeId The state activeId
 * @prop {function} focusedActiveButton Handles the states of the active buttons
 * @prop {string} chosenColor The state chosenColor
 */
const SketchColorMenu = React.memo((props) => {
    // const INITIAL_COLOR = appContext.penColor;
    const [isOpened, setOpened] = useState(false);
    const [colorButtonID, setColorButtonID] = useState(0);
    const [pencilThicknessID, setPencilThicknessID] = useState(0);
    const appContext = useContext(AppContext);

    const {
        onPaletteColorChange,
        onChangePencilSize,
        onEraserPencilSwitch,
        buttonActiveId,
        activeId,
        focusedActiveButton,
        pencilColor,
    } = props;

    /**
     * useEffect to get out the colorId of the correct color
     * depending on what the settings has stored
     * @memberof SketchColorMenu
     */
    useEffect(() => {
        let index = 0;
        for (let i = 0; i < colorArray.length; i++) {
            if (colorArray[i].colorCode == appContext.penColor) {
                setColorButtonID(i);
                index = i;
            }
        }
        onPaletteColorChange(colorArray[index].colorCode);
    }, [appContext.penColor]);

    /**
     * Used to assign an ID to the color buttons.
     * @memberof SketchColorMenu
     * @param {number} value The id for the color buttons
     */
    const chosenColorButton = (value) => {
        setColorButtonID(value);
        setOpened(false);
    };

    /**
     * Used to assign an ID to the pencil thickness buttons
     * @memberof SketchColorMenu
     * @param {number} value The id for the pencil thickness button
     */
    const chosenThicknessButton = (value) => {
        setPencilThicknessID(value);
        setOpened(false);
    };

    /**
     * Handles what happens to the pencil button when you press it or when you press another button after the pencil button.
     * @memberof SketchColorMenu
     */
    const onPressMenuTrigger = () => {
        if (activeId != 0) {
            onEraserPencilSwitch();
            focusedActiveButton(buttonActiveId);
            setOpened(false);
        } else {
            setOpened(true);
        }
    };

    /**
     * Maps through an array of color codes and returns a button for each color.
     * The button is used for changing the color of the pencil.
     * @memberof SketchColorMenu
     * @param {object} value Contains the color code and the unique key
     * @param {number} index The index of the objects in the array
     */
    const ColorButtons = colorArray.map((value, index) => {
        return (
            <ColorButton
                key={value.key}
                colorName={value.colorCode}
                colorButtonID={colorButtonID}
                buttonID={index}
                onPaletteColorChange={onPaletteColorChange}
                chosenColorButton={chosenColorButton}
            />
        );
    });

    /**
     * Maps through an array of objects containing numbers and returns a button for for each object.
     * The button is used for changing the thickness of the pencil.
     * @memberof SketchColorMenu
     * @param {object} value Contains the thickness of the pencil, thickness of the view and the unique key
     * @param {number} index The index of the objects in the array
     */
    const pencilThicknessButtons = pencilThicknessArray.map((value, index) => {
        return (
            <MenuOption
                key={value.key}
                onSelect={() => {
                    onChangePencilSize(value.pencilThickness);
                    chosenThicknessButton(index);
                }}>
                <PencilSizeButton
                    pencilThickness={value.viewThickness}
                    buttonID={index}
                    pencilThicknessID={pencilThicknessID}
                />
            </MenuOption>
        );
    });

    return (
        <View>
            <Menu
                renderer={Popover}
                rendererProps={{
                    preferredPlacement: 'bottom',
                    anchorStyle: { backgroundColor: Colors.colorPaletteMenu },
                }}
                opened={isOpened}
                onBackdropPress={() => {
                    setOpened(false);
                }}>
                <MenuTrigger>
                    <TouchableOpacity
                        style={[
                            styles.buttonSize,
                            activeId === buttonActiveId
                                ? {
                                      backgroundColor: pencilColor,
                                  }
                                : {
                                      backgroundColor: Colors.headerBg,
                                  },
                        ]}
                        onPress={() => {
                            onPressMenuTrigger();
                        }}>
                        <Icon
                            name={'pen'}
                            size={Icons.medium}
                            solid
                            color={
                                activeId === buttonActiveId
                                    ? Colors.textPrimary
                                    : Colors.icons
                            }
                        />
                        <Icon
                            name={'sort-down'}
                            size={Icons.small}
                            solid
                            color={
                                activeId === 0
                                    ? Colors.textPrimary
                                    : 'transparent'
                            }
                            style={styles.downIconMenu}
                        />
                    </TouchableOpacity>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    <View style={styles.colorButtonsContainer}>
                        {ColorButtons}
                    </View>
                    <MenuOptions>
                        <View style={styles.pencilThicknessContainer}>
                            {pencilThicknessButtons}
                        </View>
                    </MenuOptions>
                </MenuOptions>
            </Menu>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButton,
    },
    downIconMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: isSmallScreen() ? 20 : 26,
        left: isSmallScreen() ? 24 : 33,
        transform: [{ rotate: '-45deg' }],
    },
    menuOptions: {
        // flex: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.colorPaletteMenu,
        overflow: 'hidden',
    },
    colorButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    pencilThicknessContainer: {
        flexShrink: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default SketchColorMenu;
