/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles';
import SketchHeader from '../components/sketchComponents/SketchHeader';
import SelectIntersection from '../components/sketchComponents/SelectIntersection';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const RoundAboutScreen = ({ navigation }) => {
    const sketchRef = useRef();

    const [currBrushColor, setBrushColor] = useState('black');
    const [currBrushSize, setBrushSize] = useState(10);

    const onColorChange = (newColor) => {
        setColor(newColor);
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

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header name="Veikryss" navigation={navigation} /> */}
            <SketchHeader
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
                onBrushColorChange={onBrushColorChange}
            />
            <View style={screenStyles.main}>
                <SelectIntersection>
                    <SketchCanvas
                        ref={sketchRef}
                        style={screenStyles.sketchCanvas}
                        strokeColor={currBrushColor}
                        strokeWidth={currBrushSize}
                    />
                </SelectIntersection>
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
        backgroundColor: 'transparent',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    strokeColorButton: {
        width: 30,
        height: 30,
    },
});

export default RoundAboutScreen;
