import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons, Typography } from '../../styles';
import { isSmallScreen } from '../helpers';

/**
 * Component that displays a Header at the top of the screen.
 * Takes in other React Native components as children.
 * @namespace Header
 * @category ReusableComponents
 * @prop {array} [name] The header text
 * @prop {styleSheet} [style] Optional styling of the Header
 */
const Header = React.memo((props) => {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.header, ...props.style }}>
            <TouchableOpacity
                onPress={navigation.toggleDrawer}
                style={styles.icon}>
                <Icon name={'bars'} size={Icons.medium} color={Colors.icons} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{props.name}</Text>
            {props.children}
        </View>
    );
});

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: isSmallScreen() ? 60 : 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.headerBg,
    },
    icon: {
        marginRight: '2%',
    },
    headerText: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: '3.2%',
        width: '100%',
        height: '100%',
        textAlignVertical: 'center',
        color: Colors.icons,
        paddingRight: 25,
        textAlign: 'center',
        ...Typography.heading,
    },
});

export default Header;
