/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles/mainStyles';

import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

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
        <SafeAreaView style={styles.container}>
            <SketchHeader
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
                onBrushColorChange={onBrushColorChange}
            />
            <View style={screenStyles.main}>
                <ImageBackground
                    style={screenStyles.backgroundImage}
                    source={props.source}>
                    <SketchCanvas
                        ref={sketchRef}
                        style={screenStyles.sketchCanvas}
                        strokeColor={currBrushColor}
                        strokeWidth={currBrushSize}
                    />
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
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
