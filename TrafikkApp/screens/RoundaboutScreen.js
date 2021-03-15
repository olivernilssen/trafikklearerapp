import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * Screen component for roundbaout screen / rundkjøring
 */
const RoundaboutScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea navigation={navigation} name={'Rundkjoring'} />
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
