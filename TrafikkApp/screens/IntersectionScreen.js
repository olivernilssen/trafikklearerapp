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
import SketchHeader from '../components/SketchHeader';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

const IntersectionScreen = ({ navigation }) => {
    const sketchRef = useRef();

    const [currColor, setColor] = useState('black');
    const [brushSize, setBrushSize] = useState(20);

    const onColorChange = (newColor) => {
        setColor(newColor);
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
            <Header name="Veikryss" navigation={navigation} />
            <SketchHeader
                undo={undoChange}
                clear={clearCanvas}
                eraser={eraser}
            />
            <View style={screenStyles.main}>
                <ImageBackground
                    style={screenStyles.backgroundImage}
                    source={require('../assets/temp_kryss.png')}>
                    <SketchCanvas
                        ref={sketchRef}
                        style={screenStyles.sketchCanvas}
                        strokeColor={currColor}
                        strokeWidth={brushSize}
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
        flexDirection: 'row',
        margin: 50,
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
});

export default IntersectionScreen;
