import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import drawerStyle from '../styles/drawerStyle.js';
import DrawerMenu from './DrawerMenu.js';

import StartScreen from '../screens/StartScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import IntersectionScreen from '../screens/IntersectionScreen.js';

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
	return (
		<Drawer.Navigator
			initialRouteName="StartScreen"
			drawerType="front"
			drawerContent={(props) => <DrawerMenu {...props} />}
		>
			<Drawer.Screen name="Hjem" component={StartScreen} />
			<Drawer.Screen
				name="Innstillinger"
				component={SettingsScreen}
			/>
			<Drawer.Screen
				name="Veikryss"
				component={IntersectionScreen}
			/>
		</Drawer.Navigator>
	);
}

export default MyDrawer;
