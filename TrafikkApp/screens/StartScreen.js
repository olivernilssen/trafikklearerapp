import React from 'react';
import { StyleSheet } from 'react-native';
import { RView } from 'react-native-responsive-component';

import MainView from '../components/MainView';
import Header from '../components/Header.js';
import StartScreenLink from '../components/StartScreenLink.js';
import Color from '../styles/Colors';

const StartScreen = ({ navigation }) => {
    return (
        <MainView>
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
                    <StartScreenLink
                        name="road"
                        text="Vei"
                        onPress={() => navigation.navigate('RoadScreen')}
                    />
                </RView>

                <RView
                    style$ptr={screenStyles.containerPtr}
                    style$lnd={screenStyles.containerLnd}>
                    <StartScreenLink name="question" text="tba" />
                    <StartScreenLink name="question" text="tba" />
                    <StartScreenLink name="question" text="tba" />
                </RView>
            </RView>
        </MainView>
    );
};

const screenStyles = StyleSheet.create({
    mainPtr: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Color.background,
    },
    mainLnd: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Color.background,
    },
    containerPtr: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    containerLnd: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default StartScreen;
