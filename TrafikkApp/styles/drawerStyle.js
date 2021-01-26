import { StyleSheet } from 'react-native';

const drawerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#dddddd',
		paddingTop: 70
	},
	menuItem: {
		flexDirection: 'row',
		marginBottom: 15,
		color: '#48466d'
	},
	menuItemText: {
		fontSize: 20,
		fontWeight: '300',
		margin: 15,
		color: '#222831'
	}
});

export default drawerStyles;
