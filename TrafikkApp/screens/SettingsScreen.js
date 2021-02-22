/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainView from '../components/MainView';
import Header from '../components/Header.js';
import Color from '../styles/Colors';

const SettingsScreen = ({ navigation }) => {
    return (
        <MainView>
            <Header name="Innstillinger" navigation={navigation} />
            <View style={styles.main}>
                <Text>Innstillinger</Text>
            </View>
        </MainView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.background,
    },
});

export default SettingsScreen;
