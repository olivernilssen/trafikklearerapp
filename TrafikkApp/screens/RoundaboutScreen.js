/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import SketchArea from '../components/sketchComponents/SketchArea';


const RoundaboutScreen = ({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea navigation={navigation} name={'Rundkjoring'} />
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default RoundaboutScreen;
