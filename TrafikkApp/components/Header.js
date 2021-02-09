import Icon from 'react-native-vector-icons/FontAwesome5';
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Color from '../styles/Colors';

const Header = ({ name, navigation }) => (
    <View style={styles.header}>
        <TouchableOpacity
            onPress={
                name == 'Hjem' ? navigation.toggleDrawer : navigation.goBack
            }>
            <Icon
                name={name == 'Hjem' ? 'bars' : 'angle-left'}
                size={32}
                color={Color.headerText}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Color.header,
        elevation: 10,
    },
    headerText: {
        flex: 1,
        color: Color.headerText,
        fontSize: 25,
        paddingRight: 30,
        textAlign: 'center',
    },
});

export default Header;
