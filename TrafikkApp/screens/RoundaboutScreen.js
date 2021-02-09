/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles';
import SketchArea from '../components/sketchComponents/SketchArea';

const RoundAboutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={screenStyles.sketchArea}>
                <SketchArea />
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default RoundAboutScreen;
