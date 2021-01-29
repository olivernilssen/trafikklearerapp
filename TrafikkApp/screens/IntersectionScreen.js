/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';


const IntersectionScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Veikryss" navigation={navigation} />
            <View style={screenStyles.main}>
                <ImageBackground style={screenStyles.backgroundImage}
                source={require('../assets/temp_kryss.png')}
                >
                    <Text>Veikryss siden</Text>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    main: {
        flex: 1,
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    }
});


export default IntersectionScreen;
