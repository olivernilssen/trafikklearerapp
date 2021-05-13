import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainView } from '../components/reusableComponents/';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * Screen component for map sketch screen
 * Will show the sketch area but with the snapshot background if there i
 * if any.
 * @namespace MapSketchScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const MapSketchScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea name={'Map'} />
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

export default MapSketchScreen;
