import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

const { Popover } = renderers;

// import { Colors } from '../../styles';

const PencilSizePopup = (props) => {
    // const pencilSizeButton = (pencilThickness) => {
    return (
        <View style={styles.iconPlacement}>
            <View
                style={{
                    width: 50,
                    height: props.pencilThickness,
                    backgroundColor: 'black',
                }}></View>
        </View>
    );
    // };

    // return (
    //     <View style={props.propsStyle}>
    //         <Menu
    //             renderer={Popover}
    //             rendererProps={{ preferredPlacement: 'bottom' }}>
    //             <MenuTrigger>
    //                 <Icon name={'minus'} solid size={32} color={'black'} />
    //             </MenuTrigger>
    //             <MenuOptions
    //                 style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }}>
    //                 <MenuOption>{pencilSizeButton(5)}</MenuOption>
    //                 <MenuOption>{pencilSizeButton(8)}</MenuOption>
    //                 <MenuOption>{pencilSizeButton(11)}</MenuOption>
    //             </MenuOptions>
    //         </Menu>
    //     </View>
    // );
};

const styles = StyleSheet.create({
    iconPlacement: {
        height: 60,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSmall: {
        height: 5,
        width: 32,
        backgroundColor: 'black',
    },
    iconMedium: {
        height: 8,
        width: 32,
        backgroundColor: 'black',
    },
    iconBig: {
        height: 11,
        width: 32,
        backgroundColor: 'black',
    },
});

export default PencilSizePopup;
