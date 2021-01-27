import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu.js';

import StartScreen from '../screens/StartScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import IntersectionScreen from '../screens/IntersectionScreen.js';

const Drawer = createDrawerNavigator();

const MyDrawer = (props) => {
     return (
          <Drawer.Navigator
               initialRouteName="StartScreen"
               drawerType="front"
               drawerContent={(props) => <DrawerMenu {...props} />}>
               <Drawer.Screen name="StartScreen" component={StartScreen} />
               <Drawer.Screen
                    name="IntersectionScreen"
                    component={IntersectionScreen}
               />
               <Drawer.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
               />
          </Drawer.Navigator>
     );
};

export default MyDrawer;
