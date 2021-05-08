import React, { useState, useRef, useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import AppContext from '../AppContext';
import USER_KEYS from '../components/helpers/storageKeys';
import mapStyle from '../components/mapComponents/mapStyle';
import { useEffect } from 'react';
import { Header } from '../components/reusableComponents/index';
import Colors from '../styles/colors';

const randomRegion = {
    latitude: 69.660084,
    longitude: 18.94557,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
};

const MapScreen = ({ navigation }) => {
    const appContext = useContext(AppContext);
    const [initalRegion, setInitalRegion] = useState(randomRegion);
    const [region, setRegion] = useState(randomRegion);
    const [pin, setPin] = useState(randomRegion);
    const [mapSnapshot, setMapSnapshot] = useState(appContext.latestSnapshot);
    const mapRef = useRef();
    const [markerVisible, setMarkerVisible] = useState(true);

    const takeSnapshot = () => {
        // 'takeSnapshot' takes a config object with the
        // following options
        const snapshot = mapRef.current.takeSnapshot({
            width: Dimensions.get('window').width, // optional, when omitted the view-width is used
            height: Dimensions.get('window').height, // optional, when omitted the view-height is used
            format: 'png', // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
            result: 'file', // result types: 'file', 'base64' (default: 'file')
        });

        snapshot.then((uri) => {
            setMapSnapshot(uri);
            appContext.saveNewSettings(
                uri,
                appContext.setLatestSnapshot,
                USER_KEYS.SNAPSHOT_KEY
            );
        });
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(initalRegion, 3000);
        }
    }, []);

    const goToPin = () => {
        mapRef.current.animateToRegion(pin, 3000);
    };

    const saveLocation = () => {
        appContext.saveNewSettings(
            JSON.stringify(pin),
            appContext.setSavedLocation,
            USER_KEYS.SAVEDLOC_KEY
        );
    };

    const zoomInLocation = () => {
        mapRef.current.animateToRegion(
            {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta / 2,
                longitudeDelta: region.latitudeDelta / 2,
            },
            2000
        );
    };

    const zoomOutLocation = () => {
        console.log('clicked');
        mapRef.current.animateToRegion(
            {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.latitudeDelta * 2,
            },
            2000
        );
    };

    return (
        <View style={styles.main}>
            <Header
                name="Kart"
                toggleDrawer={navigation.toggleDrawer}
                style={styles.header}
            />
            <View styles={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    customMapStyle={mapStyle}
                    initalRegion={initalRegion}
                    ref={mapRef}
                    onRegionChangeComplete={(region) => setRegion(region)}
                    showsUserLocation={true}
                    onPress={(e) =>
                        setPin({
                            ...e.nativeEvent.coordinate,
                            latitudeDelta: 0.00972,
                            longitudeDelta: 0.01736,
                        })
                    }>
                    {markerVisible && <Marker coordinate={pin} />}
                </MapView>
                <Callout style={styles.zoomCallout}>
                    <TouchableOpacity
                        style={styles.zoomButtons}
                        onPress={() => zoomInLocation()}>
                        <Text style={styles.zoomButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.zoomButtons}
                        onPress={() => zoomOutLocation()}>
                        <Text style={styles.zoomButtonText}>-</Text>
                    </TouchableOpacity>
                </Callout>

                <View style={styles.overlay}>
                    {/* GROUP OF BUTTONS ON MAP */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takeSnapshot}>
                            <Text style={styles.buttonText}>Ta skjermdump</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {}}>
                            <Text style={styles.buttonText}>Bruk bilde</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setMarkerVisible(!markerVisible);
                            }}>
                            <Text style={styles.buttonText}>
                                {markerVisible ? 'Gjem' : 'Vis'} pin
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => goToPin()}>
                            <Text style={styles.buttonText}>Gå til pin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => saveLocation()}>
                            <Text style={styles.buttonText}>Lagre pin</Text>
                        </TouchableOpacity>
                    </View>

                    <Image
                        style={styles.image}
                        source={{
                            uri: mapSnapshot != '' ? mapSnapshot : null,
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        // padding: 30,
        justifyContent: 'space-evenly',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
    overlay: {
        bottom: 200,
        position: 'absolute',
        flex: 1,
        backgroundColor: Colors.dividerPrimary + '50',
        height: 300,
        width: '100%',
        alignItems: 'center',
        padding: '2%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        // opacity: 0.7,
    },
    buttonGroup: {
        flex: 1,
        flexDirection: 'column',
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
    map: {
        width: '100%',
        height: '100%',
    },
});
