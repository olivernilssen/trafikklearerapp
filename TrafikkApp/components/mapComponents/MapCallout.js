import React from 'react';
import { Callout } from 'react-native-maps';

import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import { isSmallScreen } from '../reusableComponents/globalFunctions';
import { Colors, Icons } from '../../styles';

/**
 * This component is what the user sees on top of the map
 * it's a transparent type of view
 * @namespace MapCallout
 * @category mapComponents
 * @prop {ref} MapRef the reference to the MapView object
 * @prop {hook} userFollow boolean hook to set, check and update if user is followed
 * @prop {hook} pin the pin hook to set and update the pin
 * @prop {dict} currRegion the current map region displayed on the screen
 * @prop {boolean} locationPermission if the user has allowed to use the location or not
 * @prop {function} takeSnapshot function to take snapshot of the map
 * @prop {string} maptype the current mapType
 * @returns
 */
const MapCallout = (props) => {
    const {
        mapRef,
        userFollow,
        pin,
        currRegion,
        locationPermission,
        takeSnapshot,
        mapType,
    } = props;

    /** Zoom in by a little bit on the current currRegion.coords
     * @memberof MapCallout
     */
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
        console.log(currRegion.coords.latitudeDelta);
    };

    /** Zoom out by a little bit on the current currRegion.coords
     * @memberof MapCallout
     */
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
     * @memberof MapCallout
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
                        color={
                            mapType === 'terrain'
                                ? Colors.darkZoomButton
                                : Colors.zoomButtons
                        }
                        size={isSmallScreen ? Icons.larger : Icons.xlarge}
                    />
                </TouchableOpacity>

                {/* ZOOM OUT BUTTON */}
                <TouchableOpacity
                    style={styles.zoomButtons}
                    onPress={() => zoomOutLocation()}>
                    <Icon
                        name={'minus-square'}
                        solid
                        color={
                            mapType === 'terrain'
                                ? Colors.darkZoomButton
                                : Colors.zoomButtons
                        }
                        size={isSmallScreen ? Icons.larger : Icons.xlarge}
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
                        size={isSmallScreen ? Icons.larger : Icons.xlarge}
                    />
                </TouchableOpacity>

                {/* GO TO MY PIN BUTTON */}
                <TouchableOpacity
                    style={styles.pinButton}
                    onPress={() => goToCoords(pin.coords)}>
                    <Icon
                        name={'map-pin'}
                        color={Colors.deleteButtonActive}
                        size={isSmallScreen ? Icons.large : Icons.larger}
                    />
                </TouchableOpacity>

                {/* TAKE SNAPSHOT BUTTON */}
                <TouchableOpacity
                    style={styles.pinButton}
                    onPress={takeSnapshot}>
                    <Icon
                        name={'camera'}
                        color={Colors.modalButton}
                        size={isSmallScreen ? Icons.large : Icons.xlarge}
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
        right: isSmallScreen ? 25 : 35,
        top: isSmallScreen ? 25 : 35,
        alignContent: 'center',
        // backgroundColor: 'red',
        // justifyContent: 'center',
    },
    zoomButtons: {
        width: isSmallScreen ? Icons.larger : Icons.xlarge,
        height: isSmallScreen ? Icons.larger : Icons.xlarger,
        elevation: 10,
    },
    pinButton: {
        backgroundColor: Colors.iconActive,
        borderRadius: isSmallScreen ? 5 : 10,
        marginTop: '10%',
        width: isSmallScreen ? Icons.larger : Icons.xlarge,
        height: isSmallScreen ? Icons.larger : Icons.xlarger,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    locationButton: {
        backgroundColor: Colors.iconActive,
        borderRadius: isSmallScreen ? 5 : 10,
        marginTop: isSmallScreen ? 40 : 50,
        width: isSmallScreen ? Icons.larger : Icons.xlarge,
        height: isSmallScreen ? Icons.larger : Icons.xlarger,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    zoomButtonText: {
        fontSize: isSmallScreen ? 25 : 20,
        fontWeight: 'bold',
    },
});
