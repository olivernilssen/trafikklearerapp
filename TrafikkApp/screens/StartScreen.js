import React from 'react';
import { StyleSheet, View } from 'react-native';
import styles from '../styles/mainStyles.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartScreenLink from '../components/StartScreenLink.js';

import Colors from '../styles/Colors';

import { RView } from 'react-native-responsive-component';

// pull in header with DrawerTrigger
import Header from '../components/Header.js';

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Hjem" navigation={navigation} />
            <RView
                style$ptr={screenStyles.mainPtr}
                style$lnd={screenStyles.mainLnd}>
                <RView
                    style$ptr={screenStyles.containerPtr}
                    style$lnd={screenStyles.containerLnd}>
                    <StartScreenLink
                        name="times"
                        text="Veikryss"
                        onPress={() =>
                            navigation.navigate('IntersectionScreen')
                        }
                    />
                    <StartScreenLink
                        name="crosshairs"
                        text="Rundkjøring"
                        onPress={() => navigation.navigate('RoundaboutScreen')}
                    />
                    <StartScreenLink name="road" text="Vei" />
                </RView>

                <RView
                    style$ptr={screenStyles.containerPtr}
                    style$lnd={screenStyles.containerLnd}>
                    <StartScreenLink name="question" text="tba" />
                    <StartScreenLink name="question" text="tba" />
                    <StartScreenLink name="question" text="tba" />
                </RView>
            </RView>
        </SafeAreaView>
    );
};

const screenStyles = StyleSheet.create({
    mainPtr: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    mainLnd: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    containerPtr: {
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: 'center',
    },
    containerLnd: {
        flexDirection: 'row',
    },
});

export default StartScreen;
