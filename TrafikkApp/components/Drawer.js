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
			drawerContentOptions={{ activeBackgroundColor: 'blue' }}
		>
			<Drawer.Screen
				name="StartScreen"
				component={StartScreen}
			/>
			<Drawer.Screen
				name="SettingsScreen"
				component={SettingsScreen}
			/>
			<Drawer.Screen
				name="IntersectionScreen"
				component={IntersectionScreen}
			/>
		</Drawer.Navigator>
	);
}

export default MyDrawer;
