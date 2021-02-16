/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import MainView from '../MainView';
import SketchHeader from './SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import Color from '../../styles/Colors';
import BottomSheet from './bottomSheet';

const SketchArea = (props) => {
    const sketchRef = useRef();
    const bottomSheetRef = useRef();
    const [currBrushColor, setBrushColor] = useState('black');
    const [currBrushSize, setBrushSize] = useState(10);
    const [currentImg, setImage] = useState(props.source);

    //Clear canvas if new image is loaded
    useEffect(() => {
        clearCanvas();
    }, [currentImg]);

    const onImageChange = (imgSrc) => {
        setImage(imgSrc);
    };

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

    //Vil at denne skal kjøre om bruker trykker utenfor viewen men det er ikke
    //så jævla enkelt haha. Vi må nok sette opp en form form guesture event listener som
    //ikke alltid er så enkelt.. hmm
    const toggleBottomSheet = () => {
        this.bottomSheetRef.current.onHiddenViewChange();
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
                    resizeMode={'contain'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <SketchCanvas
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={currBrushColor}
                        strokeWidth={currBrushSize}
                    />
                    <BottomSheet
                        ref={bottomSheetRef}
                        onImageChange={onImageChange}
                        type={'Intersection'}
                    />
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
