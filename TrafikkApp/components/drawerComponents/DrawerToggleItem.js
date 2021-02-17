import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../styles/Colors';

const DrawerToggleMenuItem = ({ navigation, icon }) => (
    <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.8}
        onPress={() => navigation.toggleDrawer()}>
        <Icon
            name={icon}
            size={35}
            color={Color.drawerInactiveText}
            style={styles.menuIcon}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: Color.linkDivider,
    },
    menuIcon: {
        marginTop: 10,
        marginLeft: 10,
    },
});

export default DrawerToggleMenuItem;
