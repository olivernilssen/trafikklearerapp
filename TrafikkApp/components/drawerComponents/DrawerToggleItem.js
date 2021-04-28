import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors, Icons } from '../../styles';

/**
 * Component to display the hamburger icon to toggle the drawer menu.
 * @namespace DrawerToggleItem
 * @category DrawerComponents
 * @prop {function} toggleDrawer functions for the drawer toggleDrawer
 * @prop {string} icon the icon name for this screen item
 */
const DrawerToggleItem = React.memo(({ toggleDrawer, icon }) => (
    <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.8}
        onPress={() => toggleDrawer()}>
        <Icon
            name={icon}
            size={Icons.medium}
            color={Colors.icons}
            style={styles.menuIcon}
        />
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    menuItem: {
        width: '8%',
        margin: 20,
    },
    menuIcon: {},
});

export default DrawerToggleItem;
