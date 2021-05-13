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
    AboutScreen,
    MapScreen,
    MapSketchScreen,
} from '../../screens';

const Drawer = createDrawerNavigator();

/**
 * This is the Navigator for our drawer menu.
 * This component holds all the information about the different screens and
 * the screen parameters.
 * @namespace Navigator
 * @category NavigationComponents
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
                    section: '',
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
                    section: 'Illustreringer',
                    title: 'Veikryss',
                    icon: 'edit-road',
                    screenName: 'IntersectionScreen',
                    value: 1,
                }}
            />
            <Drawer.Screen
                name="RoundaboutScreen"
                component={RoundaboutScreen}
                initialParams={{
                    section: 'Illustreringer',
                    title: 'Rundkjøring',
                    icon: 'edit-road',
                    screenName: 'RoundaboutScreen',
                    value: 2,
                }}
            />
            <Drawer.Screen
                name="CountryRoadScreen"
                component={CountryRoadScreen}
                initialParams={{
                    section: 'Illustreringer',
                    title: 'Landevei',
                    icon: 'edit-road',
                    screenName: 'CountryRoadScreen',
                    value: 3,
                }}
            />
            <Drawer.Screen
                name="HighwayScreen"
                component={HighwayScreen}
                initialParams={{
                    section: 'Illustreringer',
                    title: 'Fartsøkning- og reduksjonsfelt',
                    icon: 'edit-road',
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
                    icon: 'block',
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
                    icon: 'assignment',
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
                    icon: 'gavel',
                    screenName: 'AuthorityPyramidScreen',
                    value: 7,
                }}
            />
            <Drawer.Screen
                name="AboutScreen"
                component={AboutScreen}
                initialParams={{
                    section: 'Appen',
                    title: 'Om appen',
                    icon: 'info',
                    screenName: 'AboutScreen',
                    value: 8,
                }}
            />
            <Drawer.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                initialParams={{
                    section: 'Appen',
                    title: 'Innstillinger',
                    icon: 'settings',
                    screenName: 'SettingsScreen',
                    value: 9,
                }}
            />
            <Drawer.Screen
                name="MapScreen"
                component={MapScreen}
                initialParams={{
                    section: 'Illustreringer',
                    title: 'Kart (beta)',
                    icon: 'map',
                    screenName: 'MapScreen',
                    value: 10,
                }}
            />
            <Drawer.Screen
                name="MapSketchScreen"
                component={MapSketchScreen}
                initialParams={{
                    section: 'ingen',
                    title: 'Kart Illustrering',
                    icon: 'map',
                    screenName: 'MapSketchScreen',
                    value: 11,
                }}
            />
        </Drawer.Navigator>
    );
};

export default Navigator;
