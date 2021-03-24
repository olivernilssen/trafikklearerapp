import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainView from '../components/reusableComponents/MainView';
import Header from '../components/reusableComponents/Header';
import StartScreenLink from '../components/startScreenComponents/StartScreenLink';

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
                            name="arrow-right"
                            text="Veikryss"
                            onPress={() =>
                                navigation.navigate('IntersectionScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Rundkjøring"
                            onPress={() =>
                                navigation.navigate('RoundaboutScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Landevei"
                            onPress={() =>
                                navigation.navigate('CountryRoadScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text={'Fartsøknings- og reduksjonsfelt'}
                            onPress={() => navigation.navigate('HighwayScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Trafikkskilt og teori</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="arrow-right"
                            text="Trafikkskilt"
                            onPress={() =>
                                navigation.navigate('RoadSignScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Læreplanmål"
                            onPress={() =>
                                navigation.navigate('CurriculumObjectives')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="tba"
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Nyttige lenker</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="external-link-alt"
                            text="Link til nettside"
                            backgroundColor={Colors.startScreenLinkLink}
                            isLink={true}
                        />
                        <StartScreenLink
                            name="external-link-alt"
                            text="Link til nettside"
                            backgroundColor={Colors.startScreenLinkLink}
                            isLink={true}
                        />
                        <StartScreenLink
                            name="external-link-alt"
                            text="Link til nettside"
                            backgroundColor={Colors.startScreenLinkLink}
                            isLink={true}
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
