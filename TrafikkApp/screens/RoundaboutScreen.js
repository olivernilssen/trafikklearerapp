import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * Screen component for roundbaout screen.
 * This screen is a sketch screen, and is using the big SketchArea component with name prop 'Rundkjoring'.
 * @namespace RoundaboutScreen
 * @category Screens
 */
const RoundaboutScreen = React.memo(() => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea name={'Rundkjoring'} />
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

export default RoundaboutScreen;
