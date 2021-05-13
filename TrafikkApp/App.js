import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './components/navigationComponent/Navigator';
import { USER_KEYS } from './components/helpers';
import { readData, saveData } from './components/helpers/useAsyncStorage';
import AppContext from './AppContext';
import objectPaths from './components/settingsComponents/initial-draggable-paths';
import SplashScreen from 'react-native-splash-screen';

/**
 * This is the entry point of the app
 * Here we set all the async values in storage or read from storage if they are available
 * The app also asks for user location permission here
 * @returns
 */
const App = () => {
    // const [theme, setTheme] = useState('');
    const [penColor, setPenColor] = useState('');
    const [draggableColor, setDraggableColor] = useState('');
    const [deleteOnChange, setDeleteOnChange] = useState('');
    const [eraserSize, setEraserSize] = useState('');
    const [showDeleteAlert, setShowDeleteAlert] = useState('');
    const [draggableObjects, setDraggableObjects] = useState('');
    const [latestSnapshot, setLatestSnapshot] = useState('');
    const [savedLocation, setSavedLocation] = useState([]);
    const [locationPermission, setLocationPermission] = useState(false);

    useEffect(() => {
        SplashScreen.hide();
        // readData(USER_KEYS.THEME_KEY, setTheme, 'Mørk');
        readData(USER_KEYS.PEN_COLOR_KEY, setPenColor, '#cf262f');
        readData(USER_KEYS.DRAGGABLE_COLOR_KEY, setDraggableColor, '#000000');
        readData(USER_KEYS.DELETE_KEY, setDeleteOnChange, 'Ja');
        readData(USER_KEYS.ERASER_SIZE_KEY, setEraserSize, '80');
        readData(USER_KEYS.SHOW_DELETE_ALERT_KEY, setShowDeleteAlert, 'true');
        readData(
            USER_KEYS.DRAGGABLE_OBJECTS,
            setDraggableObjects,
            JSON.stringify(objectPaths)
        );
        readData(USER_KEYS.SNAPSHOT_KEY, setLatestSnapshot, '');
        readData(USER_KEYS.SAVEDLOC_KEY, setSavedLocation, '');
    }, []);

    const saveNewSettings = (value, setValue, key) => {
        saveData(key, value);
        setValue(value);
    };

    const userSettings = {
        saveNewSettings,
        // theme,
        penColor,
        draggableColor,
        deleteOnChange,
        eraserSize,
        showDeleteAlert,
        draggableObjects,
        latestSnapshot,
        savedLocation,
        locationPermission,
        // setTheme,
        setPenColor,
        setDraggableColor,
        setDeleteOnChange,
        setEraserSize,
        setShowDeleteAlert,
        setDraggableObjects,
        setLatestSnapshot,
        setSavedLocation,
        setLocationPermission,
    };

    /**
     * Wil run when user accesses the map for the first time
     * or if user clicks the locationbutton
     * Will ask for user permission to view User location
     * @member App
     * @returns boolean of user desicion
     */
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.info('You can use the location services');
                setLocationPermission(true);
            } else {
                console.info('location permission denied');
                setLocationPermission(false);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    /**
     * UseEffect to handle triggering of the userPermission function
     * if it has not already been approved
     */
    useEffect(() => {
        PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ).then((response) => {
            if (!response) {
                requestLocationPermission();
            } else {
                setLocationPermission(response.valueOf());
            }
        });
    }, []);

    return (
        <AppContext.Provider value={userSettings}>
            <MenuProvider>
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </MenuProvider>
        </AppContext.Provider>
    );
};

export default App;
