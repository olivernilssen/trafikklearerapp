import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons, Typography } from '../../styles';
import { RUtils } from 'react-native-responsive-component';

/**
 * Component that displays a Header at the top of the screen.
 * Takes in other React Native components as children.
 * @namespace Header
 * @category ReusableComponents
 * @prop {object} navigation Navigation object
 * @prop {array} [name] The header text
 * @prop {styleSheet} [style] Optional styling of the Header
 */
const Header = React.memo((props) => (
    <View style={{ ...styles.header, ...props.style }}>
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
        height: RUtils.isSmallScreen() ? 60 : 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.headerBg,
    },
    headerText: {
        flex: 1,
        color: Colors.icons,
        textAlign: 'center',
        ...Typography.heading,
    },
});

export default Header;
