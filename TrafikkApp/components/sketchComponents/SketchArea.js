/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const SketchArea = (props) => {
    const sketchRef = useRef();

    const [currBrushColor, setBrushColor] = useState('black');
    const [currBrushSize, setBrushSize] = useState(10);
    const [currentImg, setImage] = useState(props.source);

    //Clear canvas if new image is loaded
    useEffect(() => {
        if (currentImg != props.source) {
            setImage(props.source);
            clearCanvas();
        }
    });

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
            {/* <View style={styles.main}> */}
            <ImageBackground
                resizeMode={'contain'}
                style={styles.backgroundImage}
                source={currentImg}>
                <SketchCanvas
                    ref={sketchRef}
                    style={styles.sketchCanvas}
                    strokeColor={currBrushColor}
                    strokeWidth={currBrushSize}
                />
                {props.children}
            </ImageBackground>
            {/* </View> */}
        </MainView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
});

export default SketchArea;
