import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * The screen component for roadScreen "Landevei".
 * This screen is a sketch screen, and is using the big SketchArea component.
 * @namespace CountryRoadScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const CountryRoadScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigation={navigation}
                    name={'Landevei'}></SketchArea>
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
