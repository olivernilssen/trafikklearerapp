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
        pencil,
        undo,
        clear,
        eraser,
        onPencilColorChange,
        topMenuHidden,
        toggleRightMenuState,
        onChangePencilSize,
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
                {/* <HeaderButton
                    iconName={'bars'}
                    buttonFnc={props.navigation.toggleDrawer}
                    buttonNum={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                    propsStyle={styles.spacedLeft}
                /> */}
                <HeaderButton
                    iconName={'trash'}
                    buttonOnPress={clear}
                    buttonActiveId={null}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
                    propsStyle={styles.spacedLeft}
                />

                <PencilSizePopup propsStyle={styles.spacedCenter} />
                <SketchColorMenu
                    onPencilColorChange={onPencilColorChange}
                    onChangePencilSize={onChangePencilSize}
                    iconSize={styles.buttonSize}
                    propsStyle={styles.spacedCenter}
                    pencil={pencil}
                    buttonOnPress={pencil}
                    buttonActiveId={0}
                    activeId={activeId}
                    focusedActiveButton={focusedActiveButton}
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
                    buttonOnPress={undo}
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
