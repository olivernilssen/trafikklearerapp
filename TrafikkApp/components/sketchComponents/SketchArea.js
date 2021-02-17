/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Color from '../../styles/Colors';

const SketchArea = (props) => {
    const sketchRef = useRef();

    const [currPencilColor, setPencilColor] = useState('black');
    const [prevPencilColor, setPrevPencilColor] = useState('');
    const [currPencilSize, setPencilSize] = useState(10);
    const [currentImg, setImage] = useState(props.source);

    //Clear canvas if new image is loaded
    useEffect(() => {
        if (currentImg != props.source) {
            setImage(props.source);
            clearCanvas();
        }
    });

    const onPencilColorChange = (color) => {
        setPencilColor(color);
        console.log(color);
    };

    const onSwitchPencilColor = () => {
        if (currPencilColor === '#00000000') {
            setPencilColor(prevPencilColor);
        } else setPencilColor(currPencilColor);
    };

    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
    };

    const undoChange = () => {
        sketchRef.current.undo();
    };

    const clearCanvas = () => {
        sketchRef.current.clear();
    };

    const eraser = () => {
        if (currPencilColor != '#00000000') {
            setPrevPencilColor(currPencilColor);
            setPencilColor('#00000000');
        } else {
            currPencilColor;
        }
    };

    return (
        <MainView>
            <SketchHeader
                pencil={onSwitchPencilColor}
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
                onPencilColorChange={onPencilColorChange}
                navigation={props.navigation}
                name={props.name}
            />
            <View style={styles.main}>
                <ImageBackground
                    resizeMode={'contain'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <SketchCanvas
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={currPencilColor}
                        strokeWidth={currPencilSize}
                    />
                    {props.children}
                </ImageBackground>
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Color.sketchBg,
    },
    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        backgroundColor: Color.header,
    },
});

export default SketchArea;
