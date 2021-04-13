import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './components/drawerComponents/Navigator';
import USER_KEYS from './components/helpers/storageKeys';
import { readData, saveData } from './components/helpers/useAsyncStorage';
import AppContext from './AppContext';
import objectPaths from './components/settingsComponents/inital-draggable-paths';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
    const [theme, setTheme] = useState('');
    const [penColor, setPenColor] = useState('');
    const [draggableColor, setDraggableColor] = useState('');
    const [deleteOnChange, setDeleteOnChange] = useState('');
    const [eraserSize, setEraserSize] = useState('');
    const [showDeleteAlert, setShowDeleteAlert] = useState('');
    const [draggableObjects, setDraggableObjects] = useState('');

    useEffect(() => {
        SplashScreen.hide();
        readData(USER_KEYS.THEME_KEY, setTheme, 'Mørk');
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
    }, []);

    const saveNewSettings = (value, setValue, key) => {
        saveData(key, value);
        setValue(value);
    };

    const userSettings = {
        saveNewSettings,
        theme: theme,
        penColor: penColor,
        draggableColor: draggableColor,
        deleteOnChange: deleteOnChange,
        eraserSize: eraserSize,
        showDeleteAlert: showDeleteAlert,
        draggableObjects: draggableObjects,
        setTheme,
        setPenColor,
        setDraggableColor,
        setDeleteOnChange,
        setEraserSize,
        setShowDeleteAlert,
        setDraggableObjects,
    };

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
