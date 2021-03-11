import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { RView } from 'react-native-responsive-component';

import MainView from '../components/MainView';
import Header from '../components/Header.js';
import StartScreenLink from '../components/StartScreenLink.js';

import { Colors, Typography } from '../styles';

/**
 * Screen component for the start screen
 * contains a list of all the clickable screens in the navigator
 */
const StartScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header name="Hjem" navigation={navigation} />
            <View style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.text}>Illustrer trafikksituasjon</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="pen-alt"
                            text="Veikryss"
                            onPress={() =>
                                navigation.navigate('IntersectionScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="pen-alt"
                            text="Rundkjøring"
                            onPress={() =>
                                navigation.navigate('RoundaboutScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="pen-alt"
                            text="Vei"
                            onPress={() => navigation.navigate('RoadScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="pen-alt"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Trafikkskilt og teori</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="book"
                            text="Trafikkskilt"
                            onPress={() =>
                                navigation.navigate('RoadSignScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="book"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="book"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Nyttige lenker</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="globe"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkLink}
                        />
                        <StartScreenLink
                            name="globe"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkLink}
                        />
                        <StartScreenLink
                            name="globe"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkLink}
                        />
                    </View>
                </View>
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        height: '100%',
        paddingTop: 20,
        alignSelf: 'center',
        backgroundColor: Colors.background,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    text: {
        width: '85%',
        borderBottomWidth: 1,
        borderColor: Colors.iconActive,
        color: Colors.icons,
        paddingVertical: 5,
        ...Typography.medium,
    },
});

export default StartScreen;
