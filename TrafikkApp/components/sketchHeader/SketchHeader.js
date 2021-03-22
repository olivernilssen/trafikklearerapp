import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../reusableComponents/Header';
import SketchColorMenu from './SketchColorMenu';
import HeaderButton from './HeaderButton';
import DraggableComponentsButton from './DraggableComponentsButton';
import DeleteButtonPopover from './DeleteButtonPopover';
import { Colors, Typography } from '../../styles';

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
        height: 62,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.round,
    },
    header: {
        backgroundColor: Colors.header,
    },
    toolBar: {
        width: '100%',
        elevation: 10,
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
