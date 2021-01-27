/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';

const RoundaboutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Rundkjøring" navigation={navigation} />
            <View style={screenStyles.main}>
                <Text>Rundkjøring siden</Text>
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

export default RoundaboutScreen;
