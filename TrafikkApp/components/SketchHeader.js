import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import { Header, Left, Body, Right } from 'native-base';

const ToolBar = (props) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [eraserActive, setEraserActive] = useState(false);

    const onEraserClicked = () => {
        setEraserActive(!eraserActive);
        console.log(eraserActive);
        if (eraserActive) {
            props.eraser;
        } else {
            props.brush;
        }
    };

    const onBrushColorChange = (color, buttonId) => {
        setSelectedButton(buttonId);
        if (eraserActive) setEraserActive(!eraserActive);
        props.brush(color);
    };

    return (
        <View style={styles.toolBar}>
            <Header style={styles.header}>
                <Left style={styles.test}>
                    <View style={styles.spacedLeft}>
                        <TouchableOpacity
                            name={'blackbrush'}
                            onPress={props.brush}>
                            <Icon
                                name="paint-brush"
                                style={styles.buttonIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedLeft}>
                        <TouchableOpacity
                            onPress={() => onBrushColorChange('red')}>
                            <Icon
                                name="paint-brush"
                                style={[styles.buttonIcon, styles.redBrush]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedLeft}>
                        <TouchableOpacity
                            onPress={() => onBrushColorChange('blue')}>
                            <Icon
                                name="paint-brush"
                                style={[styles.buttonIcon, styles.blueBrush]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedLeft}>
                        <TouchableOpacity
                            onPress={() => onBrushColorChange('green')}>
                            <Icon
                                name="paint-brush"
                                style={[styles.buttonIcon, styles.greenBrush]}
                            />
                        </TouchableOpacity>
                    </View>
                </Left>
                <Body style={{}}></Body>
                <Right>
                    <View style={styles.spacedRight}>
                        <TouchableOpacity onPress={props.clear}>
                            <Icon name="trash" style={styles.buttonIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spacedRight}>
                        <TouchableOpacity onPress={onEraserClicked}>
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
    redBrush: {
        color: 'red',
    },
    blueBrush: {
        color: 'blue',
    },
    greenBrush: {
        color: 'green',
    },
    test: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ToolBar;
