import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import styles from '../styles/mainStyles.js';

const Header = ({ name, openDrawer }) => (
	<View style={styles.header}>
		<TouchableOpacity onPress={() => openDrawer()}>
			<Icon name="bars" size={32} />
		</TouchableOpacity>
		<Text>{name}</Text>
		<Text style={{ width: 50 }} />
	</View>
);

export default Header;
