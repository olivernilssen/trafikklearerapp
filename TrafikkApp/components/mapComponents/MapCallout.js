import React, { useState, useRef, useContext, useEffect } from 'react';
import { Callout } from 'react-native-maps';

import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';

import { Colors, Icons } from '../../styles';

// const mapTypes = ['standard', 'terrain'];

const MapCallout = (props) => {
    const {
        mapRef,
        userFollow,
        markerToggle,
        pin,
        userLoc,
        currRegion,
        locationPermission,
    } = props;
    const appContext = useContext(AppContext);

    /** Zoom in by a little bit on the current currRegion.coords */
    const zoomInLocation = () => {
        userFollow.onToggleFalse();
        mapRef.current.animateToRegion(
            {
                ...currRegion.coords,
                latitudeDelta: currRegion.coords.latitudeDelta / 2,
                longitudeDelta: currRegion.coords.latitudeDelta / 2,
            },
            1000
        );
    };

    /** Zoom out by a little bit on the current currRegion.coords */
    const zoomOutLocation = () => {
        userFollow.onToggleFalse();
        mapRef.current.animateToRegion(
            {
                ...currRegion.coords,
                latitudeDelta: currRegion.coords.latitudeDelta * 2,
                longitudeDelta: currRegion.coords.latitudeDelta * 2,
            },
            2000
        );
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
            3000
        );
    };

    return (
        <>
            <Callout style={styles.mainCallout}>
                {/* ZOOM IN BUTTON */}
                <TouchableOpacity
                    style={styles.zoomButtons}
                    onPress={() => zoomInLocation()}>
                    <Icon
                        name={'plus-square'}
                        solid
                        color={Colors.zoomButtons}
                        size={Icons.larger}
                    />
                </TouchableOpacity>

                {/* ZOOM OUT BUTTON */}
                <TouchableOpacity
                    style={styles.zoomButtons}
                    onPress={() => zoomOutLocation()}>
                    <Icon
                        name={'minus-square'}
                        solid
                        color={Colors.zoomButtons}
                        size={Icons.larger}
                    />
                </TouchableOpacity>

                {/* GO TO MY LOCATION BUTTON */}
                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={() => userFollow.onToggle()}>
                    <Icon
                        name={'crosshairs'}
                        color={
                            locationPermission
                                ? userFollow.isToggled
                                    ? Colors.locationArrowActive
                                    : Colors.locationArrowInactive
                                : Colors.deleteButtonActive
                        }
                        size={Icons.large}
                    />
                </TouchableOpacity>

                {/* GO TO MY PIN BUTTON */}
                <TouchableOpacity
                    style={styles.pinButton}
                    onPress={() => goToCoords(pin.coords)}>
                    <Icon
                        name={'map-pin'}
                        color={Colors.deleteButtonActive}
                        size={Icons.large}
                    />
                </TouchableOpacity>
            </Callout>
        </>
    );
};

export default MapCallout;

const styles = StyleSheet.create({
    mainCallout: {
        height: '100%',
        right: 35,
        top: 35,
        alignContent: 'center',
        // backgroundColor: 'red',
        // justifyContent: 'center',
    },
    zoomButtons: {
        width: Icons.larger,
        height: Icons.larger,
        elevation: 10,
    },
    pinButton: {
        backgroundColor: Colors.iconActive,
        borderRadius: 10,
        marginTop: '10%',
        width: Icons.larger,
        height: Icons.larger,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    locationButton: {
        backgroundColor: Colors.iconActive,
        borderRadius: 10,
        marginTop: 50,
        width: Icons.larger,
        height: Icons.larger,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    zoomButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
});
