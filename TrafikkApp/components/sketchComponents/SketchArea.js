/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { BottomSheet } from './bottomSheet';

const SketchArea = (props) => {
    const sketchRef = useRef();

    const [currBrushColor, setBrushColor] = useState('black');
    const [currBrushSize, setBrushSize] = useState(10);

    const onBrushColorChange = (color) => {
        setBrushColor(color);
    };

    const onChangeBrushSize = (newBrushSize) => {
        setBrushSize(newBrushSize);
    };

    const undoChange = () => {
        sketchRef.current.undo();
    };

    const clearCanvas = () => {
        sketchRef.current.clear();
    };

    const eraser = () => {
        setBrushColor('#00000000');
    };

    return (
        <MainView>
            <SketchHeader
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
                onBrushColorChange={onBrushColorChange}
                navigation={props.navigation}
                name={props.name}
            />
            <View style={styles.main}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={props.source}>
                    <SketchCanvas
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={currBrushColor}
                        strokeWidth={currBrushSize}
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
        elevation: 5,
    },
    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
});

export default SketchArea;
