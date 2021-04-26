import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { MainView, Header, Divider } from '../components/reusableComponents/';
import {
    StartScreenLink,
    ExternalLink,
    HeaderName,
} from '../components/startScreenComponents/';
import { Colors, Typography, Icons } from '../styles';

/**
 * Screen component for the start screen.
 * Contains links to the most important screens in the app, and some clickable external links.
 * @namespace StartScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const StartScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <Header navigation={navigation} style={styles.header}>
                <View style={styles.headerItems}>
                    <HeaderName />
                    <TouchableOpacity
                        style={styles.headerIcon}
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
                            text="Fartsøknings- og reduksjonsfelt"
                            onPress={() => navigation.navigate('HighwayScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Andre funksjoner</Text>
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
                            text="Myndighets- pyramiden"
                            onPress={() =>
                                navigation.navigate('AuthorityPyramidScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <Text style={styles.footerText}>
                        Lenker til forskrifter:
                    </Text>
                    <View style={styles.linksContainer}>
                        <ExternalLink
                            text="Trafikkopplæringsforskriften"
                            onPress={() => {
                                Linking.openURL(
                                    'https://lovdata.no/dokument/SF/forskrift/2004-10-01-1339'
                                );
                            }}
                        />
                        <Divider
                            borderColor={Colors.dividerPrimary}
                            style={styles.divider}
                        />
                        <ExternalLink
                            text="Skiltforskriften"
                            onPress={() => {
                                Linking.openURL(
                                    'https://lovdata.no/dokument/SF/forskrift/2005-10-07-1219'
                                );
                            }}
                        />
                        <Divider
                            borderColor={Colors.dividerPrimary}
                            style={styles.divider}
                        />
                        <ExternalLink
                            text="Trafikkregler"
                            onPress={() => {
                                Linking.openURL(
                                    'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747'
                                );
                            }}
                        />
                        <Divider
                            borderColor={Colors.dividerPrimary}
                            style={styles.divider}
                        />
                        <ExternalLink
                            text="Veitrafikkloven"
                            onPress={() => {
                                Linking.openURL(
                                    'https://lovdata.no/dokument/NL/lov/1965-06-18-4'
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    headerItems: {
        alignSelf: 'center',
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        marginRight: 15,
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingVertical: '10%',
        backgroundColor: Colors.startScreenBg,
    },
    container: {
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        width: '85%',
        borderBottomWidth: 2,
        borderColor: Colors.dividerPrimary,
        color: Colors.icons,
        paddingVertical: 5,
        ...Typography.section,
    },
    linksContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    footer: {
        width: '100%',
        backgroundColor: Colors.startScreenBg,
    },
    footerContent: {
        borderTopWidth: 1,
        borderTopColor: Colors.dividerPrimary,
        width: '100%',
        paddingVertical: 20,
        backgroundColor: Colors.sketchBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    footerText: {
        width: '85%',
        paddingVertical: 5,
        borderColor: Colors.dividerPrimary,
        color: Colors.icons,
        ...Typography.body,
    },
    divider: {
        width: 1,
        height: 50,
        paddingVertical: 5,
        alignSelf: 'center',
    },
});

export default StartScreen;
