import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerMenu from './DrawerMenu';
import {
    StartScreen,
    SettingsScreen,
    IntersectionScreen,
    RoundaboutScreen,
    CountryRoadScreen,
    HighwayScreen,
    RoadSignScreen,
    CurriculumObjectivesScreen,
    AuthorityPyramidScreen,
} from '../../screens/';

const Drawer = createDrawerNavigator();

/**

 * @returns Navigator component
 */
/**
 * This is the Navigator for our side drawer
 * Holds all the information about the screens and
 * the screen parameters
 * @namespace Navigator
 * @category DrawerComponents
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
                    section: '.',
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
                    section: 'illustreringer',
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
                    section: 'illustreringer',
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
                    section: 'illustreringer',
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
                    section: 'illustreringer',
                    title: 'Fartsøkning- og reduksjonsfelt',
                    icon: 'road',
                    screenName: 'HighwayScreen',
                    value: 4,
                }}
            />
            <Drawer.Screen
                name="RoadSignScreen"
                component={RoadSignScreen}
                initialParams={{
                    section: 'Teori',
                    title: 'Trafikkskilt',
                    icon: 'ban',
                    screenName: 'RoadSignScreen',
                    value: 5,
                }}
            />
            <Drawer.Screen
                name="CurriculumObjectivesScreen"
                component={CurriculumObjectivesScreen}
                initialParams={{
                    section: 'Teori',
                    title: 'Læreplanmål',
                    icon: 'graduation-cap',
                    screenName: 'CurriculumObjectivesScreen',
                    value: 6,
                }}
            />
            <Drawer.Screen
                name="AuthorityPyramidScreen"
                component={AuthorityPyramidScreen}
                initialParams={{
                    section: 'Teori',
                    title: 'Myndighetspyramiden',
                    icon: 'exclamation-triangle',
                    screenName: 'AuthorityPyramidScreen',
                    value: 7,
                }}
            />
            <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                initialParams={{
                    section: 'Andre',
                    title: 'Innstillinger',
                    icon: 'cog',
                    screenName: 'SettingsScreen',
                    value: 8,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Navigator;
