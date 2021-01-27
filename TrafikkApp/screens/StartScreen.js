import React from 'react';
import { StyleSheet, View } from 'react-native';
import styles from '../styles/mainStyles.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartScreenLink from '../components/StartScreenLink';

import Colors from '../styles/Colors';

// pull in header with DrawerTrigger
import Header from '../components/Header.js';

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Home" toggleDrawer={navigation.toggleDrawer} />
            <View style={screenStyles.container}>
                <StartScreenLink
                    name="times"
                    text="Veikryss"
                    onPress={() => navigation.navigate('IntersectionScreen')}
                />
                <StartScreenLink name="question" text="tba" />
                <StartScreenLink 
                    name="crosshairs"
                    text="Rundkjøring"
                    onPress={() => navigation.navigate('RoundaboutScreen')} 
                    />
                <StartScreenLink name="question" text="tba" />
                <StartScreenLink name="road" text="Vei" />
                <StartScreenLink name="question" text="tba" />
            </View>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',
        backgroundColor: Colors.light,
    },
});

export default StartScreen;
