/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';

const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Innstillinger" navigation={navigation} />
            <View style={screenStyles.main}>
                <Text>Innstillinger</Text>
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    main: {
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SettingsScreen;
