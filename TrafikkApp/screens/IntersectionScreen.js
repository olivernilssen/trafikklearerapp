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
import Icon from 'react-native-vector-icons/FontAwesome5';

import SelectIntersection from '../components/SelectIntersection';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const IntersectionScreen = ({ navigation }) => {
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
        setColor('#00000000');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Header name="Veikryss" navigation={navigation} /> */}
            <ToolBar
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
