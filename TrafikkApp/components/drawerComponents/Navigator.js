import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu';

import StartScreen from '../../screens/StartScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import IntersectionScreen from '../../screens/IntersectionScreen';
import RoundaboutScreen from '../../screens/RoundaboutScreen';
// import RoadScreen from '../../screens/RoadScreen';
import CountryRoadScreen from '../../screens/CountryRoadScreen';
import HighwayScreen from '../../screens/HighwayScreen';
import RoadSignScreen from '../../screens/RoadSignScreen';

const Drawer = createDrawerNavigator();

/**
 * This is the Navigator for our side drawer
 * Holds all the information about the screens and
 * the screen parameters
 * @returns The Drawer Navigator
 */
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
                    icon: 'plus',
                    screenName: 'IntersectionScreen',
                    value: 1,
                }}
            />
            <Drawer.Screen
                name="RoundaboutScreen"
                component={RoundaboutScreen}
                initialParams={{
                    title: 'Rundkjøring',
                    icon: 'dot-circle',
                    screenName: 'RoundaboutScreen',
                    value: 2,
                }}
            />
            <Drawer.Screen
                name="CountryRoadScreen"
                component={CountryRoadScreen}
                initialParams={{
                    title: 'Landevei',
                    icon: 'road',
                    screenName: 'CountryRoadScreen',
                    value: 3,
                }}
            />
            <Drawer.Screen
                name="HighwayScreen"
                component={HighwayScreen}
                initialParams={{
                    title: 'Fartsøkning- og reduksjon',
                    icon: 'road',
                    screenName: 'HighwayScreen',
                    value: 4,
                }}
            />
            <Drawer.Screen
                name="RoadSignScreen"
                component={RoadSignScreen}
                initialParams={{
                    title: 'Trafikkskilt',
                    icon: 'map-signs',
                    screenName: 'RoadSignScreen',
                    value: 5,
                }}
            />
            <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                initialParams={{
                    title: 'Innstillinger',
                    icon: 'cog',
                    screenName: 'SettingsScreen',
                    value: 6,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Navigator;
