import React, { useState, useContext, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import { isSmallScreen } from '../helpers';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import { Divider, BottomMenuAnimated } from '../reusableComponents/index';

import { Typography, Buttons, Icons, Colors } from '../../styles';

const mapTypes = {
    Standard: 'standard',
    Terreng: 'terrain',
    Satellitt: 'satellite',
};

/**
 * Component to render the bottom menu in the MapScreen for larger screens/devices.
 * @namespace LargeScreenMenu
 * @category MapComponents
 * @prop {hook} markerToggle Hook to mark or unmark the markers
 * @prop {hook} pin Hook to set the coords of the pin/marker
 * @prop {string} snapshot The path for the snapshot
 * @prop {function} takeSnapshot Call to function to take snapshot and save image
 * @prop {string} mapType The maptype being used
 * @prop {function} setMapType Setstate function to set mapType
 */
const LargeScreenMenu = ({
    markerToggle,
    pin,
    snapshot,
    takeSnapshot,
    mapType,
    setMapType,
    bottomMenuVisible,
}) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const [buttonLayout, setButtonLayout] = useState(undefined);
    const [locationPinActive, setLocationPinActive] = useState(false);

    const mapKeys = Object.keys(mapTypes);

    /**
     * @memberof LargeScreenMenu
     * @typedef {function} useEffect
     * @description useEffect that is triggered when the coordinates of the pin
     * is changed. Used to set the state locationPinActive to true or false,
     * which is used to style the "save pinned location"-button.
     */
    useEffect(() => {
        if (pin.coords != undefined) {
            setLocationPinActive(true);
        } else {
            setLocationPinActive(false);
        }
    }, [pin.coords]);

    /** Save the pinned location to async storage.
     * @memberof LargeScreenMenu
     */
    const savePinLocation = () => {
        if (pin.coords != undefined) {
            appContext.saveNewSettings(
                JSON.stringify(pin.coords),
                appContext.setSavedLocation,
                USER_KEYS.SAVEDLOC_KEY
            );
            ToastAndroid.show(
                'Markør har blitt lagret på enheten',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
    };

    return (
        <BottomMenuAnimated
            bottomSheetOpen={bottomMenuVisible}
            chevronColor={Colors.chevronColor}>
            <View style={styles.bottomSheet}>
                {/* GROUP OF BUTTONS ON MAP */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Innstillinger</Text>
                    <Divider borderColor={Colors.dividerPrimary} />
                    {/* SAVE LOCATION BUTTON */}
                    <View style={styles.innerGroup}>
                        <TouchableOpacity
                            onLayout={(e) =>
                                setButtonLayout(e.nativeEvent.layout)
                            }
                            style={
                                locationPinActive
                                    ? styles.button
                                    : styles.buttonInactive
                            }
                            activeOpacity={locationPinActive ? 0.5 : 1}
                            onPress={() => savePinLocation()}>
                            <Text
                                style={
                                    locationPinActive
                                        ? styles.buttonText
                                        : styles.buttonTextInactive
                                }>
                                Lagre pin
                            </Text>
                        </TouchableOpacity>

                        {/* MAKE MARKERS VISIBLE BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.5}
                            onPress={() => {
                                markerToggle.onToggle();
                            }}>
                            <Text style={styles.buttonText}>
                                {markerToggle.isToggled ? 'Gjem' : 'Vis'}{' '}
                                markør(er)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Skjermdump</Text>
                    <Divider borderColor={Colors.dividerPrimary} />
                    <View style={styles.innerGroup}>
                        {/* SCREENSHOT BUTTON */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                ,
                                {
                                    flexDirection: 'row',
                                },
                            ]}
                            activeOpacity={0.5}
                            onPress={takeSnapshot}>
                            <Icon
                                name={'camera'}
                                size={Icons.small}
                                color={Colors.textPrimary}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    { marginLeft: '5%' },
                                ]}>
                                Ta skjermdump
                            </Text>
                        </TouchableOpacity>

                        {/* USE PHOTO TO ILLUSTRATE BUTTON */}
                        <TouchableOpacity
                            style={[styles.button, { flexDirection: 'row' }]}
                            activeOpacity={0.5}
                            onPress={() =>
                                navigation.navigate('MapSketchScreen')
                            }>
                            <Icon
                                name={'pen'}
                                size={Icons.small}
                                color={Colors.textPrimary}
                            />
                            <Text
                                style={[
                                    styles.buttonText,
                                    { marginLeft: '5%' },
                                ]}>
                                Bruk skjermdump
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SCREENSHOTTEN IMAGE */}
                <Image
                    style={styles.image}
                    source={{
                        uri: snapshot != '' ? snapshot : null,
                    }}
                />
            </View>
            <View
                style={styles.buttonGroupComponent}
                onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}>
                <Text style={styles.sectionText}>Karttype:</Text>
                {buttonLayout && (
                    <ButtonGroup
                        selectedValue={mapKeys.find(
                            (key) => mapTypes[key] === mapType
                        )}
                        values={mapKeys}
                        width={buttonLayout.width - 80}
                        height={50}
                        onSelect={(newValue) => setMapType(mapTypes[newValue])}
                        inactiveBackgroundColor={Colors.bottomMenyButtons}
                    />
                )}
            </View>
        </BottomMenuAnimated>
    );
};

export default LargeScreenMenu;

const styles = StyleSheet.create({
    bottomSheet: {
        height: 300,
        width: '100%',
        paddingHorizontal: '2%',
        paddingTop: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonGroup: {
        flex: isSmallScreen() ? 2 : 4,
        flexDirection: 'column',
        marginRight: isSmallScreen() ? '2%' : '2%',
        height: '90%',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: isSmallScreen() ? '2%' : '3%',
    },
    innerGroup: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        padding: '5%',
        marginVertical: 10,
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        ...Buttons.rounded,
    },
    buttonInactive: {
        padding: '5%',
        marginVertical: 12,
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
    },
    buttonText: {
        color: Colors.textPrimary,
        ...Typography.body,
    },
    buttonTextInactive: {
        color: Colors.slideTextInactive,
        fontStyle: 'italic',
        ...Typography.body,
    },
    image: {
        flex: isSmallScreen() ? 1 : 2,
        height: '90%',
        width: '50%',
        padding: '5%',
        resizeMode: 'contain',
        borderWidth: 2,
        borderColor: Colors.selectedBorder,
    },
    buttonGroupComponent: {
        flex: 1,
        width: '90%',
        height: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },
});
