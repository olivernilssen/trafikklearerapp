import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Color from '../../styles/Colors';
import { Header, Left, Body } from 'native-base';
import { Colors, View } from 'react-native-ui-lib';
import SketchHeaderButton from './SketchHeaderButton';
import SketchColorMenu from './sketchColorMenu';

const SketchHeader = (props) => {
    const {
        pencil,
        undo,
        clear,
        eraser,
        onPencilColorChange,
        toggleRightMenu,
        toggleRightMenuState,
    } = props;

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
                <Body>
                    <SketchColorMenu
                        onPencilColorChange={onPencilColorChange}
                    />
                </Body>
                <SketchHeaderButton
                    toggleRightMenu={toggleRightMenu}
                    toggleRightMenuState={toggleRightMenuState}
                    pencil={pencil}
                    undo={undo}
                    clear={clear}
                    eraser={eraser}
                />
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
});

export default SketchHeader;
