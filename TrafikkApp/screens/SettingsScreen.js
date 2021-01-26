/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from '../styles/mainStyles.js';

import Header from '../components/Header.js';

const SettingsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Header
				name="Innstillinger"
				openDrawer={navigation.openDrawer}
			/>
			<View
				style={{
					height: '90%',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Innstillinger</Text>
			</View>
		</View>
	);
};
export default SettingsScreen;
