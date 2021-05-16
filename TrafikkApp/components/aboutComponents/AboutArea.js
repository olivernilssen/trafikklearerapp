import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Linking,
    TouchableHighlight,
    Image,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Header, Divider } from '../reusableComponents/';
import { Buttons, Colors, Icons, Typography } from '../../styles';
import { isSmallScreen } from '../helpers';

/**
 * The area component for the About App screen.
 * This is the component that contains all the other components related to the AboutScreen.
 * @namespace AboutArea
 * @category AboutComponents
 */
const AboutArea = React.memo((props) => {
    const pkg = require('../../package.json');
    const appVersion = pkg.version;
    imgSource = require('../../assets/images/logo_round.png');

    /**
     * Button event that opens the Google Play Store site for the app.
     * @memberof AboutArea
     */
    const openPlayStore = () => {
        const GOOGLE_PACKAGE_NAME = 'com.illustrafikk';
        Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);
    };

    /**
     * Button event that opens the default email app to send an email to the developers.
     * @memberof AboutArea
     */
    const sendMail = () => {
        const mailAddress = 'illustrafikk@gmail.com';
        Linking.openURL(`mailto:${mailAddress}`);
    };

    return (
        <>
            <Header name="Om appen" style={styles.header} />
            <View style={styles.main}>
                <View style={styles.section}>
                    <Image
                        source={imgSource}
                        style={styles.image}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.headingText}>
                        illusTrafikk - App for trafikklærere
                    </Text>
                    <Text style={styles.text}>Versjon: {appVersion}</Text>
                </View>
                <Divider
                    style={styles.divider}
                    borderColor={Colors.dividerPrimary}
                />
                <ScrollView
                    contentContainerStyle={styles.infoSection}
                    persistentScrollbar={true}>
                    <Text style={styles.text}>
                        Applikasjonen er laget for trafikklærere og er ment å
                        brukes på nettbrett med Android operativsystem. Tanken
                        er at appen skal være et hjelpemiddel i
                        trafikkopplæringen med særlig fokus på illustrering av
                        ulike trafikksituasjoner.
                    </Text>
                    <Text style={styles.text}>
                        Gjerne ta kontakt med oss hvis du har forslag til
                        forbedringer eller oppdager feil i applikasjonen.
                    </Text>
                </ScrollView>
                <Divider
                    style={styles.divider}
                    borderColor={Colors.dividerPrimary}
                />
                <View style={styles.section}>
                    <Text style={styles.sectionText}>UTVIKLERE</Text>
                    <Text style={styles.text}>
                        Oliver Elias Nilssen, Joakim Heitmann Tronseth og Silje
                        Tanemsmo
                    </Text>
                    <TouchableHighlight onPress={() => sendMail()} style={{}}>
                        <View style={styles.sendMailButton}>
                            <Icon
                                name="envelope"
                                size={Icons.small}
                                color={Colors.textPrimary}
                            />
                            <Text style={styles.buttonText}>
                                illustrafikk@gmail.com
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Divider
                    style={styles.divider}
                    borderColor={Colors.dividerPrimary}
                />
                <View style={styles.section}>
                    <TouchableHighlight
                        onPress={() => openPlayStore()}
                        style={{}}>
                        <View style={styles.rateUsButton}>
                            <Icon
                                name="google-play"
                                size={Icons.small}
                                color={Colors.textPrimary}
                            />
                            <Text style={styles.buttonText}>
                                Vurder appen på Google Play
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    main: {
        flex: 1,
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'center',
        backgroundColor: Colors.sketchBackground,
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
    },
    section: {
        alignItems: 'center',
        margin: '1%',
        padding: '3%',
    },
    infoSection: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: '1%',
        padding: '3%',
        paddingVertical: '5%',
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: Colors.footer,
    },
    image: {
        height: isSmallScreen() ? 70 : 120,
        marginBottom: 10,
    },
    headingText: {
        color: Colors.logo,
        paddingBottom: '1%',
        flexWrap: 'wrap',
        textAlign: 'center',
        ...Typography.heading,
    },
    sectionText: {
        color: Colors.logo,
        paddingBottom: '2%',
        flexWrap: 'wrap',
        ...Typography.section,
    },
    text: {
        color: Colors.textPrimary,
        textAlign: 'center',
        lineHeight: 25,
        paddingBottom: '2%',
        ...Typography.body,
    },
    sendMailButton: {
        width: isSmallScreen() ? 250 : 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#22a6dd',
        padding: 12,
        justifyContent: 'center',
        ...Buttons.rounded,
    },
    rateUsButton: {
        width: isSmallScreen() ? 250 : 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00875F',
        padding: 12,
        justifyContent: 'center',
        ...Buttons.rounded,
    },
    buttonText: {
        marginLeft: 10,
        color: Colors.textPrimary,
        ...Typography.body,
    },
});

export default AboutArea;
