import { StyleSheet } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
     container: {
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',

          // backgroundColor: 'black'
     },
     header: {
          width: '100%',
          height: '8%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: Colors.dark,
     },
     headerText: {
          color: Colors.light,
          fontSize: 25,
     },
});

export default styles;
