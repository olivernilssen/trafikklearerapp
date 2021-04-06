import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';

/**
 * The screen component for roadScreen "Landevei"
 * @namespace HighwayScreen
 * @memberof Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const HighwayScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigation={navigation}
                    name={'Fartsøknings- og reduksjonsfelt'}></SketchArea>
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

export default HighwayScreen;
