/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles';
import SketchHeader from '../components/SketchHeader';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { TouchableHighlight } from 'react-native-gesture-handler';

const IntersectionScreen = ({ navigation }) => {
    const sketchRef = useRef();

    const [currColor, setColor] = useState('black');
    const [brushSize, setBrushSize] = useState(5);

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

    return (
        <SafeAreaView style={styles.container}>
            <SketchHeader
                name="Veikryss"
                navigation={navigation}
                undo={undoChange}
                clear={undoChange}
            />
            <View style={screenStyles.main}>
                <SketchCanvas
                    ref={sketchRef}
                    style={{ flex: 10 }}
                    strokeColor={currColor}
                    strokeWidth={20}
                />
                <ImageBackground
                    style={screenStyles.backgroundImage}
                    source={require('../assets/temp_kryss.png')}>
                    <Text>Veikryss siden</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    main: {
        flex: 1,
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
});

export default IntersectionScreen;
