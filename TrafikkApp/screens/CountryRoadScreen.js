import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * The screen component for roadScreen "Landevei"
 * Denne er langt fra ferdig!
 * @namespace CountryRoadScreen
 * @memberof Screens
 * @prop {object} navigation
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
