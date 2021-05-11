import React, { useState, useRef, useContext, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { mapBeigeRoad, mapBeigeRoadZoomed } from './mapStyles';
import { Colors, Icons } from '../../styles';
import { LargeScreenMenu, SmallScreenMenu, MapCallout } from './index';
import { useToggle } from '../helpers/useToggle';
import { useCoords } from '../helpers/useCoords';
import { isSmallScreen } from '../reusableComponents/globalFunctions';

const randomRegion = {
    latitude: 69.660084,
    longitude: 18.94557,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

/**
 * @namespace MapArea
 * @category mapComponents
 * MapArea contains the MapView, Callout and bottom menu assosiated with the map
 * It will handle the permission to get user location aswell
 */
const MapArea = ({ navigate }) => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();

    const [snapshot, setSnapshot] = useState(appContext.latestSnapshot);
    const [mapType, setMapType] = useState('standard');
    const [locationPermission, setLocationPermission] = useState(false);
    const isMounted = useToggle(true);
    const userFollow = useToggle(false);
    const markerToggle = useToggle(true);
    const pin = useCoords(
        appContext.savedLocation != ''
            ? JSON.parse(appContext.savedLocation)
            : undefined
    );
    const userLoc = useCoords(undefined);
    const currRegion = useCoords({ latitudeDelta: 0.01 });
    const mapRef = useRef();
    let _watchId = undefined;

    /**
     * @memberof MapArea
     * On mount checks if the user location is active an starts tracking user
     */
    const trackUser = () => {
        _watchId = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                userLoc.onUpdate({ latitude, longitude });
                if (isMounted.isToggled) {
                    setLocationPermission(true);
                }
            },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
            }
        );
    };

    /**
     * Use effect that runs when component is in focus and when it is out of focus
     * Will start the geolocation watch to track user movement
     * and remove it upon umount
     * @memberof MapArea
     */
    useFocusEffect(
        React.useCallback(() => {
            _watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    userLoc.onUpdate({ latitude, longitude });
                    setLocationPermission(true);
                },
                (error) => {
                    console.error(error);
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 0,
                    interval: 5000,
                    fastestInterval: 2000,
                }
            );

            return () => {
                console.log('*****unmounted*****', _watchId);

                if (_watchId) {
                    Geolocation.clearWatch(_watchId);
                    console.log('*****UNWATCH*****', _watchId);
                }
            };
        }, [])
    );

    /**
     * Wil run when user accesses the map for the first time
     * or if user clicks the locationbutton
     * Will ask for user permission to view User location
     * @memberof MapArea
     * @returns boolean of user desicion
     */
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Illustrafikk',
                    message:
                        'Illustrafikk spør om tillatelse til å bruke lokasjonen din',
                    buttonNeutral: 'Spør meg senere',
                    buttonNegative: 'Ikke tillat',
                    buttonPositive: 'Tillat',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.info('You can use the location services');
                return true;
            } else {
                console.info('location permission denied');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    /**
     * UseEffect to handle triggering of the userPermission function
     * if it has not already been approved
     * @memberof MapArea
     */
    useEffect(() => {
        if (!locationPermission && userFollow.isToggled) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((response) => {
                if (!response) {
                    requestLocationPermission().then((permission) => {
                        setLocationPermission(permission.valueOf());
                        if (permission) trackUser();
                    });
                } else {
                    setLocationPermission(response.valueOf());
                    trackUser();
                }
            });
        }
    }, [userFollow.isToggled]);

    /**
     * UseEffect to get toggled if wants to track their own movement
     * will updated cameraview to where user is moving
     * @memberof MapArea
     */
    useEffect(() => {
        if (userFollow.isToggled) {
            mapRef.current.animateToRegion(
                {
                    ...userLoc.coords,
                    latitudeDelta: currRegion.coords.latitudeDelta,
                    longitudeDelta: currRegion.coords.latitudeDelta,
                },
                500
            );
        }
    }, [userLoc]);

    /** When user opens map, go to user if available, else go to last pin, else go to init currRegion.coords
     * @memberof MapArea
     */
    useEffect(() => {
        if (mapRef.current) {
            if (userLoc.coords) {
                mapRef.current.animateToRegion(
                    {
                        ...userLoc.coords,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                    },
                    2000
                );
            } else if (pin.coords) {
                mapRef.current.animateToRegion(
                    {
                        ...pin.coords,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                    },
                    2000
                );
            } else {
                mapRef.current.animateToRegion(
                    {
                        ...randomRegion,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                    },
                    2000
                );
            }
        }
    }, []);

    /**
     * Take a snapshot of the map view where the user is right now
     * It will be saved in cache and also saved to async storage for later use
     * @memberof MapArea
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

    return (
        <View style={styles.container}>
            {/*  THE MAIN MAP VIEW */}
            <MapView
                style={styles.map}
                loadingBackgroundColor={Colors.modalBg}
                customMapStyle={
                    currRegion.coords.latitudeDelta <= 0.0045
                        ? mapBeigeRoadZoomed
                        : mapBeigeRoad
                }
                initalregion={randomRegion}
                // showsUserLocation={true}
                ref={mapRef}
                showsIndoors={false}
                showsBuildings={false}
                showsPointsOfInterest={false}
                mapType={mapType}
                onPanDrag={() => userFollow.onToggleFalse()}
                onRegionChangeComplete={(e) => currRegion.onUpdate(e)}
                onPress={(e) => pin.onUpdate(e.nativeEvent.coordinate)}>
                {markerToggle.isToggled && pin.coords && (
                    <Marker
                        coordinate={pin.coords}
                        image={require('../../assets/Elements/map/location.png')}
                    />
                )}

                {userLoc.coords && markerToggle.isToggled && (
                    <Marker
                        coordinate={userLoc.coords}
                        image={require('../../assets/Elements/map/userLocation.png')}
                    />
                )}
            </MapView>

            <MapCallout
                pin={pin}
                userLoc={userLoc}
                currRegion={currRegion}
                snapshot={snapshot}
                takeSnapshot={takeSnapshot}
                mapRef={mapRef}
                markerToggle={markerToggle}
                userFollow={userFollow}
                locationPermission={locationPermission}
                mapType={mapType}
            />

            {isSmallScreen === true ? (
                <SmallScreenMenu
                    pin={pin}
                    snapshot={snapshot}
                    takeSnapshot={takeSnapshot}
                    markerToggle={markerToggle}
                    mapType={mapType}
                    setMapType={setMapType}
                    navigate={navigation.navigate}
                />
            ) : (
                <LargeScreenMenu
                    pin={pin}
                    snapshot={snapshot}
                    takeSnapshot={takeSnapshot}
                    markerToggle={markerToggle}
                    mapType={mapType}
                    setMapType={setMapType}
                    navigate={navigation.navigate}
                />
            )}
        </View>
    );
};

export default MapArea;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
