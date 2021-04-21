import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Linking,
    TouchableHighlight,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MainView, Header, Divider } from '../components/reusableComponents/';
import { Buttons, Colors, Icons, Typography } from '../styles';

/**
 * The screen component for the About App screen.
 * The screen displays some info about the app and contact information for the developers.
 * It also displays a button that sends the user to Google Play Store to review the app.
 * @namespace AboutScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const AboutScreen = React.memo(({ navigation }) => {
    const pkg = require('../package.json');
    const appVersion = pkg.version;
    imgSource = require('../assets/images/logo_round.png');

    /**
     * Button event that opens the Google Play Store site for the app.
     * @memberof AboutScreen
     */
    const openPlayStore = () => {
        // it's a good idea to add this in .env file and use it from there
        const GOOGLE_PACKAGE_NAME = 'com.trafikkapp';
        // Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);

        Linking.openURL('https://github.com/olivernilssen/trafikklearerapp/');
    };

    /**
     * Button event that opens the default email app to send an email to the developers.
     * @memberof AboutScreen
     */
    const sendMail = () => {
        const mailAddress = 'illustrafikk@gmail.com';
        Linking.openURL(`mailto:${mailAddress}`);
    };

    return (
        <MainView>
            <Header
                name="Om appen"
                navigation={navigation}
                style={styles.header}
            />
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
                <View style={styles.section}>
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
                </View>
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
        </MainView>
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
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.sketchBackground,
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
    },
    section: {
        alignItems: 'center',
        margin: 20,
        padding: 20,
    },
    image: {
        height: 120,
        // width: '85%',
    },
    headingText: {
        color: Colors.logo,
        paddingBottom: 10,
        ...Typography.heading,
    },
    sectionText: {
        color: Colors.logo,
        paddingBottom: 10,
        ...Typography.section,
    },
    text: {
        color: Colors.textPrimary,
        textAlign: 'center',
        lineHeight: 25,
        paddingBottom: 10,
        ...Typography.body,
    },
    sendMailButton: {
        width: 270,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#22a6dd',
        padding: 15,
        justifyContent: 'center',
        ...Buttons.rounded,
    },
    rateUsButton: {
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00875F',
        padding: 15,
        justifyContent: 'center',
        ...Buttons.rounded,
    },
    buttonText: {
        marginLeft: 10,
        color: Colors.textPrimary,
        ...Typography.body,
    },
});

export default AboutScreen;
