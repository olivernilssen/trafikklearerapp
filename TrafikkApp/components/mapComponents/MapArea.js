import React, { useState, useRef, useContext, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import AppContext from '../../AppContext';
import {
    mapPinkRoad,
    mapBeigeRoad,
    mapWhiteRoad,
    mapOrangeRoad,
} from './mapStyles';
import Colors from '../../styles/colors';
import MapMenu from './MapMenu';
import { useToggle } from '../helpers/useToggle';
import { useCoords } from '../helpers/useCoords';

const randomRegion = {
    latitude: 69.660084,
    longitude: 18.94557,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
};

// const mapTypes = ['standard', 'terrain'];

const MapArea = (props) => {
    const appContext = useContext(AppContext);

    const [snapshot, setSnapshot] = useState('');
    const [mapType, setMapType] = useState('standard');
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
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 4000,
                fastestInterval: 1500,
            }
        );

        return () => {
            if (_watchId) {
                Geolocation.clearWatch(_watchId);
            }
        };
    }, []);

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

    /** Zoom in by a little bit on the current currRegion.coords */
    const zoomInLocation = () => {
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
        mapRef.current.animateToRegion(
            {
                ...currRegion.coords,
                latitudeDelta: currRegion.coords.latitudeDelta * 2,
                longitudeDelta: currRegion.coords.latitudeDelta * 2,
            },
            2000
        );
    };

    return (
        <View style={styles.container}>
            {/*  THE MAIN MAP VIEW */}
            <MapView
                style={styles.map}
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

            <Callout style={styles.zoomCallout}>
                {/* ZOOM IN BUTTON */}
                <TouchableOpacity
                    style={styles.zoomButtons}
                    onPress={() => zoomInLocation()}>
                    <Text style={styles.zoomButtonText}>+</Text>
                </TouchableOpacity>

                {/* ZOOM OUT BUTTON */}
                <TouchableOpacity
                    style={styles.zoomButtons}
                    onPress={() => zoomOutLocation()}>
                    <Text style={styles.zoomButtonText}>-</Text>
                </TouchableOpacity>
            </Callout>

            <MapMenu
                pin={pin}
                userLoc={userLoc}
                currRegion={currRegion}
                snapshot={snapshot}
                setSnapshot={setSnapshot}
                mapRef={mapRef}
                markerToggle={markerToggle}
                userFollow={userFollow}
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
    zoomCallout: {
        right: 0,
        top: 15,
        alignItems: 'center',
    },
    zoomButtons: {
        padding: '2%',
        margin: '3%',
        width: 50,
        height: 50,
        backgroundColor: Colors.secSlideActiveBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 10,
    },
    zoomButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
});
