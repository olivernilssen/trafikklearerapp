/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import styles from '../styles/mainStyles.js';
import Header from '../components/Header.js';

const IntersectionScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Header
				name="Veikryss"
				openDrawer={navigation.openDrawer}
			/>
			<View
				style={{
					height: '90%',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Veikryss siden</Text>
			</View>
		</View>
	);
};

export default IntersectionScreen;
