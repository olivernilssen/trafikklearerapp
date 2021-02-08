/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles';
import ToolBar from '../components/SketchHeader';
import Header from '../components/Header';
import SelectIntersection from '../components/SelectIntersection';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const IntersectionScreen = ({ navigation }) => {
    const sketchRef = useRef();

    const [currBrushColor, setBrushColor] = useState('black');
    const [currBrushSize, setBrushSize] = useState(10);

<<<<<<< HEAD
    const onColorChange = (newColor) => {
        setColor(newColor);
    };

    const brush = (color) => {
        setColor(color);
=======
    const onBrushColorChange = (color) => {
        setBrushColor(color);
>>>>>>> 26736a6b24b88b287a3868a92b8d452e1bc8b775
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
        setColor('#00000000');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header name="Veikryss" navigation={navigation} /> */}
            <ToolBar
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
<<<<<<< HEAD
                brush={brush}
=======
                onBrushColorChange={onBrushColorChange}
>>>>>>> 26736a6b24b88b287a3868a92b8d452e1bc8b775
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
        // flexDirection: 'row',
        //margin: 50,
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

export default IntersectionScreen;
