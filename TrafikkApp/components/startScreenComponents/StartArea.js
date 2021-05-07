import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Header, Divider } from '../reusableComponents/';
import { StartScreenLink, ExternalLink, HeaderName } from './';
import { Colors, Typography, Icons } from '../../styles';

import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
/**
 * Screen component for the start screen.
 * Contains links to the most important screens in the app, and some clickable external links.
 * @namespace StartArea
 * @category StartScreenComponents
 * @prop {object} navigate Used to navigate to SettingsScreen
 * @prop {function} toggleDrawer function to toggle the drawer
 */
const StartArea = React.memo((props) => {
    const { toggleDrawer, navigate } = props;

    // const testFunc = () => {
    //     console.log('Height: ' + height + '--- width: ' + width);
    // };

    return (
        <View style={styles.startArea}>
            <Header toggleDrawer={toggleDrawer} style={styles.header}>
                <View style={styles.headerItems}>
                    <HeaderName />
                    <TouchableOpacity
                        style={styles.headerIcon}
                        activeOpacity={0.6}
                        navigateTo={() => navigate('SettingsScreen')}>
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
                            navigateTo={() => navigate('IntersectionScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Rundkjøring"
                            navigateTo={() => navigate('RoundaboutScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Landevei"
                            navigateTo={() => navigate('CountryRoadScreen')}
                            backgroundColor={Colors.startScreenLinkDrawing}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Fartsøknings- og reduksjonsfelt"
                            navigateTo={() => navigate('HighwayScreen')}
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
                            navigateTo={() => navigate('RoadSignScreen')}
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Læreplanmål"
                            navigateTo={() =>
                                navigate('CurriculumObjectivesScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                        <StartScreenLink
                            name="arrow-right"
                            text="Myndighets- pyramiden"
                            navigateTo={() =>
                                navigate('AuthorityPyramidScreen')
                            }
                            backgroundColor={Colors.startScreenLinkTheory}
                        />
                    </View>
                </View>
            </View>
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
        flex: 1,
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
        flex: 1,
        // width: '100%',
        // height: '100%',
        justifyContent: 'center',
        paddingVertical: '10%',
        backgroundColor: Colors.startScreenBg,
    },
    container: {
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
        borderTopWidth: 1,
        borderTopColor: Colors.dividerPrimary,
        width: '100%',
        paddingVertical: '2%',
        backgroundColor: Colors.footer,
        justifyContent: 'center',
        alignItems: 'center',
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
