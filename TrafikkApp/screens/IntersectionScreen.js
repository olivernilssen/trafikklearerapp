import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * The screen component for the intersection screen.
 * This screen is a sketch screen, and is using the big SketchArea component with namne prop 'Veikryss'.
 * @namespace IntersectionScreen
 * @category Screens
 */
const IntersectionScreen = React.memo(() => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea name={'Veikryss'} />
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default IntersectionScreen;
