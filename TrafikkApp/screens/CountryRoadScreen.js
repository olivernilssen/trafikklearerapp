import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * The screen component for roadScreen "Landevei".
 * This screen is a sketch screen, and is using the big SketchArea component with name prop 'Landevei'.
 * @namespace CountryRoadScreen
 * @category Screens
 */
const CountryRoadScreen = React.memo(() => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea name={'Landevei'} />
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

export default CountryRoadScreen;
