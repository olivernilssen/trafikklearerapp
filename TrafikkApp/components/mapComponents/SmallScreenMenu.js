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
import {
    Divider,
    BottomMenuAnimated,
    ButtonGroup,
} from '../reusableComponents/index';

import { Typography, Buttons, Icons, Colors } from '../../styles';

const mapTypes = {
    Standard: 'standard',
    Terreng: 'terrain',
    Satellitt: 'satellite',
};

/**
 * Component to render the bottom menu in the MapScreen for smaller screens/devices.
 * @namespace SmallScreenMenu
 * @category MapComponents
 * @prop {hook} markerToggle Hook to mark or unmark the markers
 * @prop {hook} pin Hook to set the coords of the pin/marker
 * @prop {string} snapshot The path for the snapshot
 * @prop {function} takeSnapshot Call to function to take snapshot and save img
 * @prop {string} mapType The maptype being used
 * @prop {function} setMapType Setstate function to set maptype
 */
const SmallScreenMenu = ({
    markerToggle,
    pin,
    snapshot,
    takeSnapshot,
    mapType,
    setMapType,
    bottomMenuVisible,
}) => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();

    const [buttonLayout, setButtonLayout] = useState(undefined);
    const [locationPinActive, setLocationPinActive] = useState(false);

    const mapKeys = Object.keys(mapTypes);

    /**
     * @memberof SmallScreenMenu
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
     * @memberof SmallScreenMenu
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
                {/* GROUP OF BUTTONS IN MENU */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Funksjoner</Text>
                    <Divider borderColor={Colors.dividerPrimary} />

                    {/* INNER GROUP OF BUTTONS */}
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

                        {/* SAVE LOCATION BUTTON */}
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
                                Lagre markør
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

                {/* SCREENSHOTTEN IMAGE */}
                <Image
                    style={styles.image}
                    source={{
                        uri: snapshot != '' ? snapshot : null,
                    }}
                />
            </View>
            <View
                style={styles.buttonComp}
                onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}>
                <Text style={styles.sectionText}>Karttype:</Text>
                {buttonLayout && (
                    <ButtonGroup
                        selectedValue={mapKeys.find(
                            (key) => mapTypes[key] === mapType
                        )}
                        values={mapKeys}
                        width={buttonLayout.width - 50}
                        onSelect={(newValue) => setMapType(mapTypes[newValue])}
                        inactiveBackgroundColor={Colors.bottomMenyButtons}
                    />
                )}
            </View>
        </BottomMenuAnimated>
    );
};

export default SmallScreenMenu;

const styles = StyleSheet.create({
    bottomSheet: {
        height: 250,
        width: '100%',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonGroup: {
        flex: 2,
        flexDirection: 'column',
        marginRight: isSmallScreen() ? '4%' : '5%',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: isSmallScreen() ? '2%' : '5%',
    },
    innerGroup: {
        height: '80%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    button: {
        padding: '3%',
        marginVertical: 6,
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
        elevation: 5,
    },
    buttonInactive: {
        padding: '3%',
        marginVertical: 7,
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
    buttonComp: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    image: {
        flex: 1,
        height: '80%',
        padding: '5%',
        resizeMode: 'cover',
        borderWidth: 2,
        alignSelf: 'center',
        borderColor: Colors.selectedBorder,
    },
});
