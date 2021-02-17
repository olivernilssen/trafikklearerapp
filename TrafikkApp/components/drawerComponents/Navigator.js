import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu';

import StartScreen from '../../screens/StartScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import IntersectionScreen from '../../screens/IntersectionScreen';
import RoundaboutScreen from '../../screens/RoundaboutScreen';
import RoadScreen from '../../screens/RoadScreen';

const Drawer = createDrawerNavigator();

const Navigator = () => {
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
                initialParams={{
                    title: 'Hjem',
                    icon: 'home',
                    screenName: 'StartScreen',
                    value: 0,
                }}
            />
            <Drawer.Screen
                name="IntersectionScreen"
                component={IntersectionScreen}
                initialParams={{
                    title: 'Veikryss',
                    icon: 'road',
                    screenName: 'IntersectionScreen',
                    value: 1,
                }}
            />
            <Drawer.Screen
                name="RoundaboutScreen"
                component={RoundaboutScreen}
                initialParams={{
                    title: 'Rundkjøring',
                    icon: 'crosshairs',
                    screenName: 'RoundaboutScreen',
                    value: 2,
                }}
            />
            <Drawer.Screen
                name="RoadScreen"
                component={RoadScreen}
                initialParams={{
                    title: 'Vei',
                    icon: 'road',
                    screenName: 'RoadScreen',
                    value: 3,
                }}
            />
            <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                initialParams={{
                    title: 'Innstillinger',
                    icon: 'sliders',
                    screenName: 'SettingsScreen',
                    value: 4,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Navigator;
