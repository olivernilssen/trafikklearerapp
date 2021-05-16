import React from 'react';
import { Callout } from 'react-native-maps';

import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { isSmallScreen } from '../helpers';
import { Colors, Icons } from '../../styles';

/**
 * This component is what the user sees on top of the map.
 * Tt's a transparent type of view.
 * @namespace MapCallout
 * @category MapComponents
 * @prop {ref} MapRef The reference to the MapView object
 * @prop {hook} userFollow Boolean hook to set, check and update if user is followed
 * @prop {hook} pin The pin hook to set and update the pin
 * @prop {dict} currRegion The current map region displayed on the screen
 * @prop {boolean} locationPermission If the user has allowed to use the location or not
 * @prop {function} takeSnapshot Function to take snapshot of the map
 * @prop {string} maptype The current mapType
 */
const MapCallout = (props) => {
    const {
        mapRef,
        userFollow,
        pin,
        locationPermission,
        takeSnapshot,
        mapType,
        bottomMenuVisible,
    } = props;

    const isSatellite = mapType === 'satellite';

    /** Zoom the camera IN on the current location
     * @memberof MapCallout
     */
    const zoomInLocation = () => {
        userFollow.onToggleFalse();
        mapRef?.current?.getCamera().then((cam) => {
            cam.zoom += 1;
            mapRef?.current?.animateCamera(cam, { duration: 800 });
        });
    };

    /** Zoom the camera OUT on current location
     * @memberof MapCallout
     */
    const zoomOutLocation = () => {
        userFollow.onToggleFalse();

        mapRef?.current?.getCamera().then((cam) => {
            cam.zoom -= 1;
            mapRef?.current?.animateCamera(cam, { duration: 800 });
        });
    };

    /** Turn the camera so it is facing north again
     * @memberof MapCallout
     */
    const faceNorth = () => {
        userFollow.onToggleFalse();

        mapRef?.current?.getCamera().then((cam) => {
            cam.heading = 0;
            mapRef?.current?.animateCamera(cam, { duration: 1000 });
        });
    };

    /**
     * Function that changes the camera position to zoom in to coords
     * @memberof MapCallout
     * @param {object} coords Object with longitude and latitude
     */
    const goToCoords = (coords) => {
        userFollow.onToggleFalse();
        mapRef?.current?.getCamera().then((cam) => {
            cam.center = { ...coords };
            mapRef?.current?.animateCamera(cam, { duration: 2000 });
        });
    };

    const bgColor = {
        backgroundColor: isSatellite
            ? Colors.buttonBgLight
            : Colors.buttonBgDark,
    };

    const permissionUser = {
        color: locationPermission
            ? userFollow.isToggled
                ? Colors.locationArrowActive
                : Colors.locationArrowInactive
            : Colors.locationNotAvailable,
        src: locationPermission
            ? userFollow.isToggled
                ? require('../../assets/Elements/map/gps-on.png')
                : require('../../assets/Elements/map/gps-off.png')
            : require('../../assets/Elements/map/no-gps.png'),
    };

    return (
        <>
            <Callout style={styles.mainCallout}>
                {/* ZOOM IN BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={styles.zoomButtons}
                    onPress={() => zoomInLocation()}>
                    <Icon
                        name={'plus-square'}
                        solid
                        color={bgColor.backgroundColor}
                        size={isSmallScreen() ? Icons.larger : Icons.xlarge + 5}
                    />
                </TouchableHighlight>

                {/* ZOOM OUT BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={styles.zoomButtons}
                    onPress={() => zoomOutLocation()}>
                    <Icon
                        name={'minus-square'}
                        solid
                        color={bgColor.backgroundColor}
                        size={isSmallScreen() ? Icons.larger : Icons.xlarge + 5}
                    />
                </TouchableHighlight>
                {/* FACE NORTH BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={[styles.imgContainer, bgColor, { marginBottom: 45 }]}
                    onPress={() => faceNorth()}>
                    <Image
                        style={styles.img}
                        tintColor={
                            isSatellite
                                ? Colors.textSecondary
                                : Colors.slideTextInactive
                        }
                        source={require('../../assets/Elements/map/north.png')}
                    />
                </TouchableHighlight>

                {/* GO TO MY LOCATION BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={[styles.imgContainer, bgColor]}
                    onPress={() => userFollow.onToggle()}>
                    <Image
                        style={styles.img}
                        tintColor={permissionUser.color}
                        source={permissionUser.src}
                    />
                </TouchableHighlight>

                {/* GO TO MY PIN BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={[styles.imgContainer, bgColor]}
                    onPress={() => goToCoords(pin.coords)}>
                    <Image
                        style={styles.img}
                        source={
                            isSatellite
                                ? require('../../assets/Elements/map/pin3.png')
                                : require('../../assets/Elements/map/pin(2).png')
                        }
                    />
                </TouchableHighlight>

                {/* TAKE SNAPSHOT BUTTON */}
                <TouchableHighlight
                    underlayColor={bgColor.backgroundColor + 'b3'}
                    style={[styles.imgContainer, bgColor]}
                    onPress={() => {
                        takeSnapshot();
                        bottomMenuVisible.onOpen();
                    }}>
                    <Image
                        style={styles.img}
                        tintColor={Colors.cameraDark}
                        source={require('../../assets/Elements/map/photo-camera.png')}
                    />
                </TouchableHighlight>
            </Callout>
        </>
    );
};

export default MapCallout;

const measurments = {
    width: isSmallScreen() ? Icons.larger : Icons.xlarge,
    height: isSmallScreen() ? Icons.larger : Icons.xlarge,
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center',
    borderRadius: isSmallScreen() ? 5 : 10,
};

const styles = StyleSheet.create({
    mainCallout: {
        height: '100%',
        right: isSmallScreen() ? 25 : 35,
        top: isSmallScreen() ? 25 : 35,
        alignContent: 'center',
    },
    zoomButtons: {
        ...measurments,
    },
    pinButton: {
        ...measurments,
        marginTop: '10%',
    },
    locationButton: {
        ...measurments,
        backgroundColor: Colors.buttonBgLight,
        marginTop: isSmallScreen() ? 40 : 50,
    },
    zoomButtonText: {
        fontSize: isSmallScreen() ? 25 : 20,
        fontWeight: 'bold',
    },
    imgContainer: {
        ...measurments,
        marginVertical: 5,
        backgroundColor: Colors.buttonBgLight,
    },
    img: {
        width: '75%',
        height: '75%',
        borderRadius: isSmallScreen() ? 5 : 10,
    },
});
