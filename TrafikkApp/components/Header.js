import Icon from 'react-native-vector-icons/FontAwesome5';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Color from '../styles/Colors';

const Header = React.memo((props) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
            <Icon name={'bars'} size={32} color={Color.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.name}</Text>
        {props.children}
    </View>
));

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Color.header,
        elevation: 5,
    },
    headerText: {
        flex: 1,
        color: Color.headerText,
        fontFamily: '',
        fontSize: 30,
        paddingRight: 30,
        textAlign: 'center',
    },
});

export default Header;
