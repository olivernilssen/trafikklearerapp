import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import drawerStyles from '../styles/drawerStyle.js';
import {
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer';

const menuData = [
	{ icon: 'home', name: 'Hjem', screenName: 'StartScreen', key: 1 },
	{
		icon: 'sliders',
		name: 'Innstillinger',
		screenName: 'SettingsScreen',
		key: 2
	},
	{
		icon: 'road',
		name: 'Veikryss',
		screenName: 'IntersectionScreen',
		key: 3
	}
];

class DrawerMenu extends Component {
	render() {
		return (
			<View style={drawerStyles.container}>
				<BackItem
					navigation={this.props.navigation}
					icon={'times'}
				/>
				<FlatList
					data={menuData}
					renderItem={({ item }) => (
						<DrawerItem
							navigation={this.props.navigation}
							screenName={item.screenName}
							icon={item.icon}
							name={item.name}
							key={item.key}
						/>
					)}
				/>
			</View>
		);
	}
}

const DrawerItem = ({ navigation, icon, name, screenName }) => (
	<TouchableOpacity
		style={drawerStyles.menuItem}
		activeOpacity={0.1}
		onPress={() =>
			navigation.navigate(`${screenName}`, {
				isStatusBarHidden: false
			})}
	>
		<Icon
			name={icon}
			size={25}
			color="#222831"
			style={{ margin: 15 }}
		/>
		<Text style={drawerStyles.menuItemText}>{name}</Text>
	</TouchableOpacity>
);

const BackItem = ({ navigation, icon }) => (
	<TouchableOpacity
		style={drawerStyles.menuItem}
		activeOpacity={0.1}
		onPress={() => navigation.closeDrawer()}
	>
		<Icon
			name={icon}
			size={25}
			color="#222831"
			style={{ margin: 15 }}
		/>
	</TouchableOpacity>
);

export default DrawerMenu;
