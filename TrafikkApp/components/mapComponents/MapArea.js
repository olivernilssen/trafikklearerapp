import React, { useState, useRef, useContext, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, View, PermissionsAndroid, Image } from 'react-native';
import AppContext from '../../AppContext';
import USER_KEYS from '../helpers/storageKeys';
import { useFocusEffect } from '@react-navigation/native';

import { mapBeigeRoad, mapBeigeRoadZoomed } from './mapStyles';
import { Colors } from '../../styles';
import LargeScreenMenu from './LargeScreenMenu';
import SmallScreenMenu from './SmallScreenMenu';
import MapCallout from './MapCallout';
import { isSmallScreen, useToggle, useCoords, useOpen } from '../helpers';
import AlertPermissionModal from './AlertPermissionModal';

const randomRegion = {
    latitude: 63.42877,
    longitude: 10.38896,
};

/**
 * MapArea contains all the components associated with the MapScreen. This includes
 * the map view, MapCallout, SmallScreenMenu and LargeScreenMenu.
 * It will handle the permission to get the user location aswell.
 * @namespace MapArea
 * @category MapComponents
 *
 */
const MapArea = () => {
    const appContext = useContext(AppContext);
    const [snapshot, setSnapshot] = useState(appContext.latestSnapshot);
    const [mapType, setMapType] = useState('satellite');
    const modalVisible = useToggle(false);
    const userFollow = useToggle(false);
    const markerToggle = useToggle(true);
    const bottomMenuVisible = useOpen(true);
    const [latitudeDelta, setLatitudeDelta] = useState(0.01);
    const pin = useCoords(
        appContext.savedLocation == ''
            ? undefined
            : JSON.parse(appContext.savedLocation)
    );
    const userLoc = useCoords(undefined);
    const mapRef = useRef();
    let _watchId = undefined;

    /** When the user opens the map, this function pans the map to the
     * users location if its available. If its not available, it pans the map to the position
     * of the last pinned marker. If there is no marker, it goes to init currRegion.coords
     * @memberof MapArea
     */
    useEffect(() => {
        if (mapRef.current) {
            const newCamera = {
                zoom: 16,
                heading: 0,
                pitch: 0,
                altitude: 5,
            };

            if (userLoc.coords) {
                newCamera['center'] = { ...userLoc.coords };
            } else if (pin.coords) {
                newCamera['center'] = { ...pin.coords };
            } else {
                newCamera['center'] = { ...randomRegion };
            }
            mapRef.current.animateCamera(newCamera, { duration: 2000 });
        }
    }, []);

    /**
     * Use effect that runs when the component is in focus and when it is out of focus.
     * Will start the geolocation watch to track user movement
     * and remove it upon umount.
     * @memberof MapArea
     */
    useFocusEffect(
        React.useCallback(() => {
            trackUser();

            return () => {
                if (_watchId) {
                    Geolocation.clearWatch(_watchId);
                }
            };
        }, [])
    );

    /**
     * On mount this checks if the user location is active an starts tracking the user.
     * @memberof MapArea
     */
    const trackUser = () => {
        if (!_watchId) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    userLoc.onUpdate({ latitude, longitude });
                },
                (error) => console.warn('Error', JSON.stringify(error)),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );

            _watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    userLoc.onUpdate({ latitude, longitude });
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
        }
    };

    /**
     * UseEffect to handle triggering of the userPermission function
     * if it has not already been approved
     */
    useEffect(() => {
        if (userFollow.isToggled && appContext.locationPermission == false) {
            checkUserPermission();
        }
    }, [userFollow]);

    /**
     * This function checks if the user has given the app permission to use
     * location. Is the location permission is set, the trackUser function is triggered.
     * If the permission is not set, the modal to turn on location is opened.
     * @memberof MapArea
     */
    const checkUserPermission = () => {
        if (!appContext.locationPermission) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((response) => {
                if (response) {
                    appContext.setLocationPermission(response.valueOf());
                    trackUser();
                }
                if (!response.valueOf()) {
                    modalVisible.onToggleTrue();
                    userFollow.onToggleFalse();
                }
            });
        }
    };

    /**
     * UseEffect to get toggled if the user wants to track their own movement.
     * Will update the camera view to where the user is moving.
     * @memberof MapArea
     */
    useEffect(() => {
        if (userFollow.isToggled) {
            mapRef?.current?.getCamera().then((cam) => {
                cam.center = { ...userLoc.coords };
                mapRef?.current?.animateCamera(cam, { duration: 800 });
            });
        }
    }, [userLoc]);

    /**
     * Takes a snapshot of the map view where the user is right now.
     * It will be saved in cache and also saved to async storage for later use.
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
            <AlertPermissionModal
                modalVisible={modalVisible}
                checkUserPermission={checkUserPermission}
            />
            {/*  THE MAIN MAP VIEW */}
            <MapView
                style={styles.map}
                loadingBackgroundColor={Colors.modalBg}
                customMapStyle={
                    latitudeDelta <= 0.003 ? mapBeigeRoadZoomed : mapBeigeRoad
                }
                ref={mapRef}
                paddingAdjustmentBehavior={'automatic'}
                showsIndoors={false}
                showsBuildings={false}
                showsPointsOfInterest={false}
                mapType={mapType}
                showsCompass={false}
                onPanDrag={() => userFollow.onToggleFalse()}
                onRegionChangeComplete={(e) => {
                    setLatitudeDelta(e.latitudeDelta);
                }}
                onPress={(e) =>
                    pin.onUpdate({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    })
                }>
                {markerToggle.isToggled && pin.coords && (
                    <Marker coordinate={pin.coords}>
                        <Image
                            source={require('../../assets/Elements/map/pin(2).png')}
                            style={styles.mapIcon}
                            resizeMode={'contain'}
                            // resizeMethod={'resize'}
                        />
                    </Marker>
                )}

                {userLoc.coords && markerToggle.isToggled && (
                    <Marker coordinate={userLoc.coords}>
                        <Image
                            source={require('../../assets/Elements/map/pin.png')}
                            style={styles.mapIcon}
                            resizeMode={'contain'}
                            // resizeMethod={'resize'}
                        />
                    </Marker>
                )}
            </MapView>

            <MapCallout
                pin={pin}
                userLoc={userLoc}
                snapshot={snapshot}
                takeSnapshot={takeSnapshot}
                mapRef={mapRef}
                markerToggle={markerToggle}
                userFollow={userFollow}
                locationPermission={appContext.locationPermission}
                mapType={mapType}
                bottomMenuVisible={bottomMenuVisible}
            />

            {isSmallScreen() ? (
                <SmallScreenMenu
                    pin={pin}
                    snapshot={snapshot}
                    takeSnapshot={takeSnapshot}
                    markerToggle={markerToggle}
                    mapType={mapType}
                    setMapType={setMapType}
                    bottomMenuVisible={bottomMenuVisible}
                />
            ) : (
                <LargeScreenMenu
                    pin={pin}
                    snapshot={snapshot}
                    takeSnapshot={takeSnapshot}
                    markerToggle={markerToggle}
                    mapType={mapType}
                    setMapType={setMapType}
                    bottomMenuVisible={bottomMenuVisible}
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
    mapIcon: {
        height: isSmallScreen() ? 50 : 60,
        width: isSmallScreen() ? 50 : 60,
    },
});
