import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * The scren component to show the sketcharea of Veikryss.
 * This screen is a sketch screen, and is using the big SketchArea component.
 * @namespace IntersectionScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const IntersectionScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigate={navigation.navigate}
                    toggleDrawer={navigation.toggleDrawer}
                    name={'Veikryss'}></SketchArea>
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
