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
import PencilSizeButton from './PencilSizeButton';
import ColorButton from './ColorButton';
import { Colors, Typography, Buttons, Icons } from '../../styles';
import AppContext from '../../AppContext';

const { Popover } = renderers;

/** A button with a menu for the drawing component of the sketchheader
 * @namespace SketchColorMenu
 * @memberof sketchHeaderComponents
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
        chosenColor,
        pencilColor,
    } = props;

    /**
     * An array that holds the colors that are used for the color buttons
     * These are also the colors used to draw with
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
     * and the pencil thickness used for changing the thickness of the pencil
     */
    const pencilThicknessArray = [
        { viewThickness: 8, pencilThickness: 5, key: 85 },
        { viewThickness: 11, pencilThickness: 8, key: 118 },
        { viewThickness: 14, pencilThickness: 11, key: 1411 },
    ];

    /**Used to handle the state of the color menu, if it is open or not
     * @memberof sketchHeaderComponents.SketchColorMenu
     * @param {boolean} value The state of isOpened
     */
    const onSecondClickOpen = (value) => {
        setOpened(value);
    };

    /** Used to assign an id to the color buttons
     * @memberof sketchHeaderComponents.SketchColorMenu
     * @param {number} value The id for the color buttons
     */
    const chosenColorButton = (value) => {
        setColorButtonID(value);
    };

    /** Used to assign an id to the pencil thickness buttons
     * @memberof sketchHeaderComponents.SketchColorMenu
     * @param {number} value The id for the pencil thickness button
     */
    const chosenThicknessButton = (value) => {
        setPencilThicknessID(value);
    };

    /** Handles what happens to the pencil button when you press it or when you press another button after the pencil button
     * @memberof sketchHeaderComponents.SketchColorMenu
     */
    const onPressMenuTrigger = () => {
        if (activeId != 0) {
            onEraserPencilSwitch();
            focusedActiveButton(buttonActiveId);
            onSecondClickOpen(false);
        } else {
            onSecondClickOpen(true);
        }
    };

    /**Maps through an array of color codes and returns a button for each color
     * the button is used for changing the color of the pencil
     * @memberof sketchHeaderComponents.SketchColorMenu
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

    /**Maps through an array of objects containing numbers and returns a button for for each object
     * The button is used for changing the thickness of the pencil
     * @memberof sketchHeaderComponents.SketchColorMenu
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
                        onPressMenuTrigger();
                    }}>
                    <View
                        style={[
                            styles.buttonSize,
                            activeId === buttonActiveId
                                ? [
                                      styles.buttonActive,
                                      { backgroundColor: pencilColor },
                                  ]
                                : [styles.buttonInactive],
                        ]}>
                        <Icon
                            name={'pen'}
                            size={Icons.small}
                            solid
                            color={Colors.textLight}
                        />
                        <Icon
                            name={'sort-down'}
                            size={25}
                            solid
                            color={
                                activeId === 0
                                    ? Colors.textLight
                                    : 'transparent'
                            }
                            style={styles.downIconMenu}
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
                        {ColorButtons}
                    </View>
                    <MenuOptions>
                        <View
                            style={{
                                flexShrink: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}>
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
        height: 62,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.round,
    },
    downIconMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: 26,
        left: 35,
        transform: [{ rotate: '-45deg' }],
    },
    upIconMenu: {
        position: 'absolute',
        alignSelf: 'center',
        top: 31,
        left: 35,
        transform: [{ rotate: '-45deg' }],
    },
    buttonActive: {
        backgroundColor: Colors.iconActive,
        ...Buttons.round,
        overflow: 'hidden',
    },
    buttonInactive: {
        color: Colors.icons,
        ...Buttons.round,
    },
    iconColorActive: {
        color: Colors.iconActive,
    },
    iconColorInactive: {
        color: '#00000000',
    },
    iconPlacement: {
        flexDirection: 'row',
        backgroundColor: 'yellow',
    },
    menuOptions: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: Colors.colorPaletteMenu,
        overflow: 'hidden',
    },
});

export default SketchColorMenu;
