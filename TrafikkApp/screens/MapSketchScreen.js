import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainView } from '../components/reusableComponents/';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * Screen component for map sketch screen.
 * This screen is a sketch screen, and is using the big SketchArea component with namne prop 'Map'.
 * This screen differs from the other screens using the SketchArea component. It will use the
 * snapshot taken from the MapScreen as background.
 * @namespace MapSketchScreen
 * @category Screens
 */
const MapSketchScreen = React.memo(() => {
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
