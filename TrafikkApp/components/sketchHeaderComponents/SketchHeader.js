import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../reusableComponents/';

import SketchColorMenu from './SketchColorMenu';
import HeaderButton from './HeaderButton';
import DraggableComponentsButton from './DraggableComponentsButton';
import DeleteButtonPopover from './DeleteButtonPopover';

import { Colors } from '../../styles';

/**
 * The SketchHeader contains all the buttons and menus related to the drawing.
 * It also contains a button to toggle the draggable components menu in and out of view.
 * @namespace SketchHeader
 * @category SketchHeaderComponents
 * @prop {function} onEraserPencilSwitch Changes the pencil color and size when switching between eraser and pencil
 * @prop {function} undoChange Function to undo the previous action of the user
 * @prop {function} clearCanvas Clears the canvas of all illustrations
 * @prop {function} eraser Sets the pencil to an eraser, erases lines instead of drawing
 * @prop {function} onPaletteColorChange changes the pencil color according to user input
 * @prop {boolean} topMenuHidden Whether the draggable components menu is hidden or not.
 * @prop {function} toggleTopMenu Toggles the top menu (draggable components menu) in and out of view
 * @prop {function} onChangePencilSize Changes the pencil thickness
 * @prop {string} pencilColor The state pencilColor
 * @prop {number} pencilSize The state pencilSize
 * @prop {string} chosenColor The state chosenColor
 */
const SketchHeader = React.memo((props) => {
    const [activeId, setActiveId] = useState(0);
    const [prevActiveId, setPrevActiveId] = useState(0);

    const {
        onEraserPencilSwitch,
        undoChange,
        clearCanvas,
        eraser,
        onPaletteColorChange,
        topMenuHidden,
        toggleTopMenu,
        onChangePencilSize,
        pencilColor,
        pencilSize,
        chosenColor,
    } = props;

    /**
     * Handles the states for active buttons
     * @memberof SketchHeader
     * @param {int} value The value of the button
     */
    const focusedActiveButton = (value) => {
        if (value === null) {
            setPrevActiveId(prevActiveId);
        } else {
            setActiveId(value);
            setPrevActiveId(value);
        }
    };

    return (
        <View style={styles.main}>
            <Header toggleDrawer={props.toggleDrawer} style={styles.header}>
                <DeleteButtonPopover
                    clearCanvas={clearCanvas}
                    propsStyle={styles.spacedLeft}
                />
                <SketchColorMenu
                    onPaletteColorChange={onPaletteColorChange}
                    onChangePencilSize={onChangePencilSize}
                    propsStyle={styles.spacedRight}
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    buttonActiveId={0}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                    pencilColor={pencilColor}
                    pencilSize={pencilSize}
                    chosenColor={chosenColor}
                />
                {/* <View style={styles.container} /> */}
                <HeaderButton
                    iconName={'eraser'}
                    buttonOnPress={eraser}
                    buttonActiveId={1}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                {/* <View style={styles.container} /> */}
                <HeaderButton
                    iconName={'undo-alt'}
                    buttonOnPress={undoChange}
                    buttonActiveId={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                {/* <View style={styles.container} /> */}
                <DraggableComponentsButton
                    activeIconName={'box-open'}
                    inactiveIconName={'box'}
                    toggleTopMenu={toggleTopMenu}
                    topMenuHidden={topMenuHidden}
                />
            </Header>
        </View>
    );
});

const styles = StyleSheet.create({
    main: {
        width: '100%',
        elevation: 10,
        zIndex: 2,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    spacedLeft: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // borderRadius: 20,
    },
    spacedRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    container: {
        paddingHorizontal: 5,
    },
    // buttonSize: {
    //     // flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     ...Buttons.sketchHeaderButton,
    // },
});

export default SketchHeader;
