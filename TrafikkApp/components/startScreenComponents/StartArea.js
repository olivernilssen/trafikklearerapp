import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header, Divider } from '../reusableComponents/';
import StartScreenLink from './StartScreenLink';
import ExternalLink from './ExternalLink';
import HeaderName from './HeaderName';
import { Colors, Typography, Icons } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { isSmallScreen } from '../helpers';

/**
 * The area component for the StartScreen. This component contains all the components related to the start screen.
 * It contains links to the most important screens in the app, and some clickable external links.
 *
 * @namespace StartArea
 * @category StartScreenComponents
 */
const StartArea = React.memo((props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.startArea}>
            <Header style={styles.header}>
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
            <ScrollView
                contentContainerStyle={[
                    styles.main,
                    { height: isSmallScreen() ? '100%' : '100%' },
                ]}>
                <View style={styles.container}>
                    <Text style={styles.text}>Illustrer trafikksituasjon</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="arrow-right"
                            text="Veikryss"
                            navigateTo={() =>
                                navigation.navigate('IntersectionScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Rundkjøring"
                            navigateTo={() =>
                                navigation.navigate('RoundaboutScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Landevei"
                            navigateTo={() =>
                                navigation.navigate('CountryRoadScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Fartsøknings- og reduksjonsfelt"
                            navigateTo={() =>
                                navigation.navigate('HighwayScreen')
                            }
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Kart (beta)"
                            navigateTo={() => navigation.navigate('MapScreen')}
                            backgroundColor={Colors.StartScreenLinkMap}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Andre funksjoner</Text>
                    <View style={styles.linksContainer}>
                        <StartScreenLink
                            name="arrow-right"
                            text="Trafikkskilt"
                            navigateTo={() =>
                                navigation.navigate('RoadSignScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Læreplanmål"
                            navigateTo={() =>
                                navigation.navigate(
                                    'CurriculumObjectivesScreen'
                                )
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Myndighets- pyramiden"
                            navigateTo={() =>
                                navigation.navigate('AuthorityPyramidScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Lenker til forskrifter:</Text>
                <View style={styles.externalLinksContainer}>
                    <ExternalLink
                        text="Trafikkopplæringsforskriften"
                        onPressLink={() => {
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
                        onPressLink={() => {
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
                        onPressLink={() => {
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
                        onPressLink={() => {
                            Linking.openURL(
                                'https://lovdata.no/dokument/NL/lov/1965-06-18-4'
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    startArea: {
        width: '100%',
        height: '100%',
    },
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
        width: '100%',
        justifyContent: 'center',
        paddingVertical: '10%',
        backgroundColor: Colors.startScreenBg,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
    },
    text: {
        width: '90%',
        borderBottomWidth: 2,
        borderColor: Colors.dividerPrimary,
        color: Colors.icons,
        paddingVertical: 5,
        ...Typography.section,
    },
    linksContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.dividerPrimary,
        width: '100%',
        paddingVertical: '2%',
        backgroundColor: Colors.footer,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    footerText: {
        width: '85%',
        paddingVertical: '1%',
        borderColor: Colors.dividerPrimary,
        color: Colors.icons,
        ...Typography.body,
    },
    externalLinksContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: 5,
    },
    divider: {
        width: 1,
        height: 20,
        alignSelf: 'center',
    },
});

export default StartArea;
