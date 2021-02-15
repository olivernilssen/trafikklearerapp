import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, Component } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

import { TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Color from '../../styles/Colors';
import { Header, Left, Body, Right } from 'native-base';
import {Colors, View, Text, ColorPalette} from 'react-native-ui-lib';

const { Popover } = renderers

const SketchHeader = (props) => {

    // onColorChange = (index) => {
    //     setActiveIndex(index);
    // };

    // const strokeColors = [
    //     { color: '#000000' },
    //     { color: '#FF0000' },
    //     { color: '#00FFFF' },
    //     { color: '#0000FF' },
    //     { color: '#0000A0' },
    //     { color: '#ADD8E6' },
    //     { color: '#800080' },
    //     { color: '#FFFF00' },
    //     { color: '#00FF00' },
    //     { color: '#FF00FF' },
    //     { color: '#FFFFFF' },
    //     { color: '#C0C0C0' },
    //     { color: '#808080' },
    //     { color: '#FFA500' },
    //     { color: '#A52A2A' },
    //     { color: '#800000' },
    //     { color: '#008000' },
    //     { color: '#808000' },
    // ];

    // const listStrokeColors = strokeColors.map((item, index) => {
    //     return (
    //         <View style={styles.spacedLeft} key={index}>
    //             <TouchableOpacity
    //                 onPress={() => props.onBrushColorChange(item.color)}>
    //                 <Icon
    //                     name="paint-brush"
    //                     style={[styles.buttonIcon, { color: item.color }]}
    //                 />
    //             </TouchableOpacity>
    //         </View>
    //     );
    // });

    


    const ColorPopup = () => {
        const INITIAL_COLOR = 'black';
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


        const setupColorPalette = {color: INITIAL_COLOR, textColor: Colors.white, customColors: [], paletteChange: false }
        const [currentColorSetup, setCurrentColorSetup] = useState(setupColorPalette);

        // onValueChange = (value, options) => {
        //     const copyState = currentColorSetup;
        //     console.log(copyState);
        //     setCurrentColorSetup({color: value, textColor: options ? options.tintColor : undefined, paletteChange: false});
        //     props.onBrushColorChange(value);
        // }

        onPaletteValueChange = (value, options) => {
            // const copyState = currentColorSetup;
            console.log(currentColorSetup);
            // copyState['color'] = value;
            // copyState['textColor'] = options ? options.tintColor : undefined;
            // copyState['paletteChange'] = true;
            // setCurrentColorSetup(copyState);
            setCurrentColorSetup({color: value, textColor: options ? options.tintColor : undefined, paletteChange: true});
            // props.onBrushColorChange(value);
        }

        const {color, textColor, customColors, paletteChange} = currentColorSetup;
        const paletteValue = paletteChange ? (color || INITIAL_COLOR) : undefined;
        // const pickerValue = !paletteChange ? (color || INITIAL_COLOR) : undefined;
        console.log(currentColorSetup.color, paletteValue);
        return (
            <View>
                <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                <MenuTrigger><Icon name={'circle'} solid size={32} color={currentColorSetup.color}/></MenuTrigger>
                <MenuOptions>
                    <MenuOption style={styles.colorMenu} ><ColorPalette value={currentColorSetup.color} onValueChange={onPaletteValueChange} colors={colors} numberOfRows={4} containerWidth={200} /></MenuOption>
                </MenuOptions>
                </Menu>
            </View>
        )
    };

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
                <Left style={styles.test}><ColorPopup /></Left>
                <Body style={{}}></Body>
                <Right>
                    <View style={styles.spacedRight}>
                        <TouchableOpacity onPress={props.clear}>
                            <Icon name="trash" style={styles.buttonIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedRight}>
                        <TouchableOpacity onPress={props.eraser}>
                            <Icon name="eraser" style={styles.buttonIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedRight}>
                        <TouchableOpacity onPress={props.undo}>
                            <Icon name="undo-alt" style={styles.buttonIcon} />
                        </TouchableOpacity>
                    </View>
                </Right>
            </Header>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.header,
        elevation: 10,
    },
    toolBar: {
        width: '100%',
    },
    buttonIcon: {
        color: Color.iconPrimary,
        fontSize: 34,
        //marginRight: '5%'
    },
    btnSelected: {
        // backgroundColor: 'yellow',
        backgroundColor: Color.iconActive,
    },
    spacedLeft: {
        flex: 1,
    },
    spacedRight: {
        flex: 1,
    },

    test: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 2,
        width: '100%',
        height: "20%",
        backgroundColor: Colors.dark80
      },
});

export default SketchHeader;
