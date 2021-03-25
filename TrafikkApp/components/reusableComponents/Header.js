import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Icons, Typography } from '../../styles';

/**
 * Component that displays a Header.
 * Takes in other React Native components as children.
 * @namespace Header
 * @memberof reusableComponents
 * @prop {object} navigation Navigation object
 * @prop {array} [name] The header text
 */
const Header = React.memo((props) => (
    <View style={styles.header}>
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
            <Icon name={'bars'} size={Icons.medium} color={Colors.icons} />
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
        backgroundColor: Colors.headerBg,
        elevation: 5,
    },
    headerText: {
        flex: 1,
        color: Colors.icons,
        paddingRight: 30,
        textAlign: 'center',
        ...Typography.heading,
    },
});

export default Header;
