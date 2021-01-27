import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu.js';

import StartScreen from '../screens/StartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IntersectionScreen from '../screens/IntersectionScreen';
import RoundaboutScreen from '../screens/RoundaboutScreen';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="StartScreen"
            lazy={true}
            drawerType="front"
            mode="modal"
            drawerContent={(props) => <DrawerMenu {...props} />}>
            <Drawer.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                    title: 'Hjem',
                }}
            />
            <Drawer.Screen
                name="IntersectionScreen"
                component={IntersectionScreen}
                options={{ title: 'Veikryss' }}
            />
            <Drawer.Screen
                name="RoundaboutScreen"
                component={RoundaboutScreen}
                options={{ title: 'Rundkjøring' }}
            />
            <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ title: 'Innstilligner' }}
            />
        </Drawer.Navigator>
    );
};

export default MyDrawer;
