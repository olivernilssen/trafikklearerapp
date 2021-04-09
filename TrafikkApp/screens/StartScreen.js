import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { MainView, Header } from '../components/reusableComponents/';
import {
    StartScreenLink,
    HeaderName,
} from '../components/startScreenComponents/';
import { Colors, Typography, Icons } from '../styles';

/**
 * Screen component for the start screen
 * contains a list of all the clickable screens in the navigator
 * @namespace StartScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const StartScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header navigation={navigation}>
                <View style={styles.headerItems}>
                    <HeaderName />
                    <TouchableOpacity
                        style={styles.iconContainer}
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate('SettingsScreen')}>
                        <Icon
                            name={'cog'}
                            size={Icons.medium}
                            color={Colors.icons}
                        />
                    </TouchableOpacity>
                </View>
            </Header>
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
                                navigation.navigate(
                                    'CurriculumObjectivesScreen'
                                )
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
        flex: 1,
        height: '100%',
        // justifyContent: 'flex-start',
        justifyContent: 'center',
        paddingTop: '2%',
        paddingBottom: '5%',
        backgroundColor: Colors.startScreenBg,
    },
    headerItems: {
        alignSelf: 'center',
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: 'center',
    },
    container: {
        // paddingVertical: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    text: {
        width: '85%',
        borderBottomWidth: 2,
        borderColor: Colors.dividerPrimary,
        color: Colors.icons,
        paddingVertical: 5,
        ...Typography.section,
    },
});

export default StartScreen;
