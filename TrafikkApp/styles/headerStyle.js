import { StyleSheet } from 'react-native';
import Colors from './Colors';

const HeaderStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.light,
    },
    headerText: {
        color: Colors.dark,
        fontSize: 25,
    },
});

export default HeaderStyles;
