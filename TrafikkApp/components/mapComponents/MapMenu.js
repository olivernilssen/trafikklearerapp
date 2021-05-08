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
import {
    mapPinkRoad,
    mapBeigeRoad,
    mapWhiteRoad,
    mapOrangeRoad,
} from './mapStyles';
import Colors from '../../styles/colors';
import { useToggle } from '../helpers/useToggle';

const randomRegion = {
    latitude: 69.660084,
    longitude: 18.94557,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
};

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
    setMapType,
}) => {
    const appContext = useContext(AppContext);

    /**
     * Take a snapshot of the map view where the user is right now
     * It will be saved in cache and also saved to async storage for later use
     */
    const takeSnapshot = () => {
        // 'takeSnapshot' takes a config object with the
        // following options
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
        mapRef.current.animateToRegion(
            {
                ...coords,
                longitudeDelta: currRegion.coords.longitudeDelta,
                latitudeDelta: currRegion.coords.latitudeDelta,
            },
            3000
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
        <View style={styles.bottomSheet}>
            {/* GROUP OF BUTTONS ON MAP */}
            <View style={styles.buttonGroup}>
                {/* SCREENSHOT BUTTON */}
                <TouchableOpacity style={styles.button} onPress={takeSnapshot}>
                    <Text style={styles.buttonText}>Ta skjermdump</Text>
                </TouchableOpacity>

                {/* USE PHOTO TO ILLUSTRATE BUTTON */}
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.buttonText}>Bruk bilde</Text>
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

                {/* GO TO PIN BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        goToCoords(pin.coords);
                    }}>
                    <Text style={styles.buttonText}>Gå til pin</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonGroup}>
                {/* SAVE LOCATION BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={savePinLocation}>
                    <Text style={styles.buttonText}>Lagre pin</Text>
                </TouchableOpacity>

                {/* GO TO MY LOCATION BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => goToCoords(userLoc.coords)}>
                    <Text style={styles.buttonText}>Gå til min lokasjon</Text>
                </TouchableOpacity>

                {/* FOLLOW USER BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => userFollow.onToggle()}>
                    <Text style={styles.buttonText}>
                        {userFollow.isToggled ? 'Slutt å følge' : 'Følg'} meg
                    </Text>
                </TouchableOpacity>

                {/* MAP TYPE BUTTON */}
                <View style={styles.innerGroup}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setMapType('terrain')}>
                        <Text style={styles.buttonText}>Terrain</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setMapType('standard')}>
                        <Text style={styles.buttonText}>Standard</Text>
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
    );
};

export default MapArea;

const styles = StyleSheet.create({
    bottomSheet: {
        bottom: 0,
        position: 'absolute',
        backgroundColor: Colors.dividerPrimary, //+ '50',
        height: 300,
        width: '100%',
        alignItems: 'center',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // opacity: 0.7,
    },
    buttonGroup: {
        flex: 2,
        flexDirection: 'column',
    },
    innerGroup: {
        flexDirection: 'row',
    },
    button: {
        padding: '3%',
        margin: '3%',
        backgroundColor: Colors.componentMenu,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
    image: {
        flex: 2,
        height: '100%',
        width: '40%',
        padding: '5%',
        margin: '2%',
        resizeMode: 'contain',
    },
});
