import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import { Header, Left, Body, Right } from 'native-base';

const ToolBar = (props) => {

    const [colorsIndex, setColorIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);

    onColorChange = (index) => {
        setActiveIndex(index)
    }

    const strokeColors = [
        { color: '#000000' },
        { color: '#FF0000' },
        { color: '#00FFFF' },
        { color: '#0000FF' },
        { color: '#0000A0' },
        { color: '#ADD8E6' },
        { color: '#800080' },
        { color: '#FFFF00' },
        { color: '#00FF00' },
        { color: '#FF00FF' },
        { color: '#FFFFFF' },
        { color: '#C0C0C0' },
        { color: '#808080' },
        { color: '#FFA500' },
        { color: '#A52A2A' },
        { color: '#800000' },
        { color: '#008000' },
        { color: '#808000' }
    ]

    const listStrokeColors = strokeColors.map((item, index) => {
        return(
            <View style={styles.spacedLeft}>
                <TouchableOpacity
                key={index} 
                onPress={() => props.onBrushColorChange(item.color)}
                >
                    <Icon name="paint-brush" style={[ styles.buttonIcon, { color: item.color} ]}/>
                </TouchableOpacity>
            </View>
        )
    })


    return (
        <View style={styles.toolBar}>
            <Header style={styles.header}>
                <Left style={styles.test}>

                    {listStrokeColors}
                </Left>
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
        backgroundColor: Colors.light,
    },
    toolBar: {
        width: '100%',
    },
    buttonIcon: {
        color: Colors.dark,
        fontSize: 34,
        //marginRight: '5%'
    },
    btnSelected: {
        backgroundColor: 'yellow',
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
});

export default ToolBar;
