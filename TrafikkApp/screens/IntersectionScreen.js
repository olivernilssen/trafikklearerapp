import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * The scren component to show the sketcharea of Veikryss
 * @namespace IntersectionScreen
 * @memberof Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const IntersectionScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigation={navigation}
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
