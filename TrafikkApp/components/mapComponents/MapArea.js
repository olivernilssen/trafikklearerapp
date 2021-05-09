import React, { useState, useRef, useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../AppContext';
import {
    mapPinkRoad,
    mapBeigeRoad,
    mapWhiteRoad,
    mapOrangeRoad,
} from './mapStyles';
import { Colors, Icons } from '../../styles';
import MapMenu from './MapMenu';
import { useToggle } from '../helpers/useToggle';
import { useCoords } from '../helpers/useCoords';
import requestLocationPermission from '../helpers/locationPermission';
import MapCallout from './MapCallout';

const randomRegion = {
    latitude: 69.660084,
    longitude: 18.94557,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
};

// const mapTypes = ['standard', 'terrain'];

const MapArea = (props) => {
    const appContext = useContext(AppContext);

    const [snapshot, setSnapshot] = useState(appContext.latestSnapshot);
    const [mapType, setMapType] = useState('standard');
    const [locationPermission, setLocationPermission] = useState(false);
    const userFollow = useToggle(false);
    const markerToggle = useToggle(true);
    const pin = useCoords(
        appContext.savedLocation != ''
            ? JSON.parse(appContext.savedLocation)
            : undefined
    );
    const userLoc = useCoords(undefined);
    const currRegion = useCoords(undefined);
    const mapRef = useRef();
    let _watchId = undefined;

    /**
     * On mount checks if the user location is active an starts tracking user
     */
    useEffect(() => {
        const _watchId = Geolocation.watchPosition(
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
            if (_watchId) {
                Geolocation.clearWatch(_watchId);
            }
        };
    }, [locationPermission]);

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

    useEffect(() => {
        if (!locationPermission) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((response) => {
                console.log(response.valueOf());
                if (!response) {
                    requestLocationPermission().then((permission) => {
                        setLocationPermission(permission.valueOf());
                    });
                } else {
                    setLocationPermission(response.valueOf());
                }
            });
        }
    }, [userFollow.isToggled]);

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

    /** When user opens map, go to user if available, else go to last pin, else go to init currRegion.coords */
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

    return (
        <View style={styles.container}>
            {/*  THE MAIN MAP VIEW */}
            <MapView
                style={styles.map}
                loadingBackgroundColor={Colors.modalBg}
                customMapStyle={mapOrangeRoad}
                initalregion={randomRegion}
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
                setSnapshot={setSnapshot}
                mapRef={mapRef}
                markerToggle={markerToggle}
                userFollow={userFollow}
                locationPermission={locationPermission}
            />

            <MapMenu
                pin={pin}
                userLoc={userLoc}
                currRegion={currRegion}
                snapshot={snapshot}
                setSnapshot={setSnapshot}
                mapRef={mapRef}
                markerToggle={markerToggle}
                userFollow={userFollow}
                mapType={mapType}
                setMapType={setMapType}
            />
        </View>
    );
};

export default MapArea;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: '100%',
        width: '100%',
        // justifyContent: 'center',
    },
    map: {
        flex: 2,
        height: '100%',
        width: '100%',
    },
});
