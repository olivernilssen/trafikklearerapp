import { StyleSheet } from 'react-native';
import Colors from './Colors';

const drawerStyles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.dark,
          paddingTop: 15,
          paddingHorizontal: 15,
     },
     menuItem: {
          flexDirection: 'row',
          marginBottom: 15,
          color: Colors.mediumDark,
     },
     menuItemText: {
          fontSize: 20,
          fontWeight: '300',
          margin: 15,
          color: Colors.light,
     },
});

export default drawerStyles;
