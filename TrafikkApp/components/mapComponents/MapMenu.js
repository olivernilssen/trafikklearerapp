import React, { useState, useRef, useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';

import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import Colors from '../../styles/colors';
import { useOpen } from '../helpers/useOpen';
import ButtonGroup from '../reusableComponents/ButtonGroup';
import { Divider, BottomMenuAnimated } from '../reusableComponents/index';

import { Typography, Buttons } from '../../styles';

const mapTypes = ['standard', 'terrain'];

const MapArea = ({
    mapRef,
    markerToggle,
    userFollow,
    pin,
    userLoc,
    currRegion,
    snapshot,
    setSnapshot,
    mapType,
    setMapType,
}) => {
    const appContext = useContext(AppContext);
    const bottomMenuToggle = useOpen(true);
    const [buttonLayout, setButtonLayout] = useState(undefined);
    // console.log(snapshot);

    /**
     * Take a snapshot of the map view where the user is right now
     * It will be saved in cache and also saved to async storage for later use
     */
    const takeSnapshot = () => {
        const snapshot = mapRef.current.takeSnapshot({
            format: 'png', // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
            result: 'file', // result types: 'file', 'base64' (default: 'file')
        });

        snapshot.then((uri) => {
            setSnapshot(uri);
            appContext.saveNewSettings(
                uri,
                appContext.setLatestSnapshot,
                USER_KEYS.SNAPSHOT_KEY
            );
        });
    };

    /**
     * Function that changes the camera position to zoom in to coords
     * @param {object} coords Object with longitude and latitude
     */
    const goToCoords = (coords) => {
        userFollow.onToggleFalse();
        mapRef.current.animateToRegion(
            {
                ...coords,
                longitudeDelta: currRegion.coords.longitudeDelta,
                latitudeDelta: currRegion.coords.latitudeDelta,
            },
            500
        );
    };

    /** Save the pinned location to async storage */
    const savePinLocation = () => {
        appContext.saveNewSettings(
            JSON.stringify(pin.coords),
            appContext.setSavedLocation,
            USER_KEYS.SAVEDLOC_KEY
        );
    };

    return (
        <BottomMenuAnimated
            bottomSheetHidden={bottomMenuToggle}
            chevronColor={Colors.chevronColor}>
            <View style={styles.bottomSheet}>
                {/* GROUP OF BUTTONS ON MAP */}
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Kart Innstillinger</Text>
                    <Divider color={Colors.dividerSecondary} />
                    {/* SAVE LOCATION BUTTON */}
                    <View style={styles.innerGroup}>
                        <TouchableOpacity
                            onLayout={(e) =>
                                setButtonLayout(e.nativeEvent.layout)
                            }
                            style={styles.button}
                            onPress={savePinLocation}>
                            <Text style={styles.buttonText}>Lagre pin</Text>
                        </TouchableOpacity>

                        {/* MAP TYPE BUTTON */}
                        {buttonLayout != undefined && (
                            <View
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: 'transparent',
                                        elevation: 0,
                                    },
                                ]}>
                                <ButtonGroup
                                    selectedValue={mapType}
                                    values={mapTypes}
                                    width={
                                        buttonLayout
                                            ? buttonLayout.width
                                            : undefined
                                    }
                                    height={
                                        buttonLayout
                                            ? buttonLayout.height
                                            : undefined
                                    }
                                    onSelect={(newValue) =>
                                        setMapType(newValue)
                                    }
                                    inactiveBackgroundColor={
                                        Colors.bottomMenyButtons
                                    }
                                    // width={'100%'}
                                />
                            </View>
                        )}

                        <TouchableOpacity
                            onLayout={(e) =>
                                setButtonLayout(e.nativeEvent.layout)
                            }
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'transparent',
                                    elevation: 0,
                                },
                            ]}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <Text style={styles.sectionText}>Skjermdump</Text>
                    <Divider color={Colors.dividerSecondary} />
                    <View style={styles.innerGroup}>
                        {/* SCREENSHOT BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takeSnapshot}>
                            <Text style={styles.buttonText}>Ta skjermdump</Text>
                        </TouchableOpacity>

                        {/* USE PHOTO TO ILLUSTRATE BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {}}>
                            <Text style={styles.buttonText}>
                                Bruk skjermdump
                            </Text>
                        </TouchableOpacity>

                        {/* MAKE MARKERS VISIBLE BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                markerToggle.onToggle();
                            }}>
                            <Text style={styles.buttonText}>
                                {markerToggle.isToggled ? 'Gjem' : 'Vis'} pin(s)
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
        </BottomMenuAnimated>
    );
};

export default MapArea;

const styles = StyleSheet.create({
    bottomSheet: {
        // backgroundColor: Colors.dividerPrimary + '50',
        height: 300,
        width: '100%',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // opacity: 0.9,
    },
    buttonGroup: {
        flex: 4,
        flexDirection: 'column',
        marginRight: '5%',
    },
    innerGroup: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    sectionText: {
        ...Typography.section,
        color: Colors.textPrimary,
        marginBottom: '5%',
    },

    button: {
        padding: '3%',
        // marginTop: '7%',
        backgroundColor: Colors.bottomMenyButtons,
        justifyContent: 'center',
        alignItems: 'center',
        ...Buttons.rounded,
        elevation: 10,
    },
    buttonComp: {
        width: '100%',
        height: '100%',
        paddingTop: '7%',
    },

    buttonText: {
        color: 'white',
        fontSize: 22,
    },
    image: {
        flex: 2,
        height: '100%',
        width: '50%',
        padding: '5%',
        resizeMode: 'contain',
        borderColor: 'white',
        borderWidth: 2,
        borderColor: Colors.selectedBorder,
    },
});
