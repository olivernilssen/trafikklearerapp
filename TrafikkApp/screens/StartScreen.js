import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RView } from 'react-native-responsive-component';

import MainView from '../components/MainView';
import Header from '../components/Header.js';
import StartScreenLink from '../components/StartScreenLink.js';

import { Colors } from '../styles';

/**
 * Screen component for the start screen
 * contains a list of all the clickable screens in the navigator
 */
const StartScreen = React.memo(({ navigation }) => {
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
                        backgroundColor={Colors.startScreenLinkDrawing}
                    />
                    <StartScreenLink
                        name="crosshairs"
                        text="Rundkjøring"
                        onPress={() => navigation.navigate('RoundaboutScreen')}
                        backgroundColor={Colors.startScreenLinkDrawing}
                    />
                    <StartScreenLink
                        name="road"
                        text="Vei"
                        onPress={() => navigation.navigate('RoadScreen')}
                        backgroundColor={Colors.startScreenLinkDrawing}
                    />
                </RView>

                <RView
                    style$ptr={screenStyles.containerPtr}
                    style$lnd={screenStyles.containerLnd}>
                    <StartScreenLink
                        name="map-signs"
                        text="Skilt"
                        onPress={() => navigation.navigate('RoadSignScreen')}
                        backgroundColor={Colors.startScreenLinkTheory}
                    />
                    <StartScreenLink
                        name="question"
                        text="tba"
                        backgroundColor={Colors.startScreenLinkTheory}
                    />
                    <StartScreenLink
                        name="question"
                        text="tba"
                        backgroundColor={Colors.startScreenLinkTheory}
                    />
                </RView>
            </RView>
        </MainView>
    );
});

const screenStyles = StyleSheet.create({
    mainPtr: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: Colors.background,
    },
    mainLnd: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: Colors.background,
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
