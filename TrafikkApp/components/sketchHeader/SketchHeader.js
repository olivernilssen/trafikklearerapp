import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Header from '../Header';
import { View } from 'react-native-ui-lib';
import SketchColorMenu from './SketchColorMenu';
import HeaderButton from './HeaderButton';
import BoxButton from './BoxButton';
import PencilSizePopup from './PencilSizePopup';
import { Colors, Typography } from '../../styles';

const SketchHeader = React.memo((props, navigation) => {
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
                <HeaderButton
                    iconName={'trash'}
                    buttonOnPress={clearCanvas}
                    buttonActiveId={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                    propsStyle={styles.spacedLeft}
                />

                <PencilSizePopup propsStyle={styles.spacedCenter} />

                <SketchColorMenu
                    onPaletteColorChange={onPaletteColorChange}
                    onChangePencilSize={onChangePencilSize}
                    iconSize={styles.buttonSize}
                    propsStyle={styles.spacedCenter}
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    buttonActiveId={0}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                    pencilColor={pencilColor}
                    pencilSize={pencilSize}
                />
                <HeaderButton
                    iconName={'eraser'}
                    buttonOnPress={eraser}
                    buttonActiveId={1}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                <HeaderButton
                    iconName={'undo-alt'}
                    buttonOnPress={undoChange}
                    buttonActiveId={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                />
                <BoxButton
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
        ...Typography.medium,
    },
    header: {
        backgroundColor: Colors.header,
    },
    toolBar: {
        width: '100%',
        elevation: 10,
    },
    spacedCenter: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacedLeft: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
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

export default SketchHeader;
