import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../reusableComponents/Header';
import SketchColorMenu from './SketchColorMenu';
import HeaderButton from './HeaderButton';
import DraggableComponentsButton from './DraggableComponentsButton';
import DeleteButtonPopover from './DeleteButtonPopover';
import { Colors, Typography, Buttons } from '../../styles';

/**The SketchHeader, contains all the buttons and menu's related to the drawing and placement of draggable components
 * @namespace SketchHeader
 * @memberof sketchHeaderComponents
 * @prop {function} onEraserPencilSwitch Changes the pencil color and size when switching between eraser and pencil
 * @prop {function} undoChange Function to undo the previous action of the user
 * @prop {function} clearCanvas Clears the canvas of all illustrations
 * @prop {function} eraser Sets the pencil to an eraser, erases lines instead of drawing
 * @prop {function} onPaletteColorChange changes the pencil color according to user input
 * @prop {boolean} topMenuHidden The state topMenuHidden
 * @prop {function} toggleRightMenuState Toggles the state of topMenuHidden
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
        toggleRightMenuState,
        onChangePencilSize,
        pencilColor,
        pencilSize,
        chosenColor,
    } = props;

    /**Handles the states for active buttons
     * @memberof sketchHeaderComponents.SketchHeader
     * @function
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
        <View style={styles.toolBar}>
            <Header
                name={''}
                navigation={props.navigation}
                style={styles.header}>
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
                <View style={{ paddingHorizontal: 5 }} />
                <HeaderButton
                    iconName={'eraser'}
                    buttonOnPress={eraser}
                    buttonActiveId={1}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                <View style={{ paddingHorizontal: 5 }} />
                <HeaderButton
                    iconName={'undo-alt'}
                    buttonOnPress={undoChange}
                    buttonActiveId={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                <View style={{ paddingHorizontal: 5 }} />
                <DraggableComponentsButton
                    activeIconName={'box-open'}
                    inactiveIconName={'box'}
                    toggleRightMenuState={toggleRightMenuState}
                    topMenuHidden={topMenuHidden}
                />
            </Header>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.sketchHeaderButton,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    toolBar: {
        width: '100%',
        elevation: 10,
        zIndex: 2,
    },
    spacedLeft: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 20,
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
});

export default SketchHeader;
