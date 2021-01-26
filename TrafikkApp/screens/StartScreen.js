import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import styles from '../styles/mainStyles.js';

// pull in header with DrawerTrigger
import Header from '../components/Header.js';

const StartScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Header name="Home" openDrawer={navigation.openDrawer} />
			<Image
				source={require('../assets/banner.png')}
				style={{ width: '100%', height: '90%' }}
				resizeMode="contain"
			/>
			<Text> Startsiden </Text>
		</View>
	);
};

export default StartScreen;
